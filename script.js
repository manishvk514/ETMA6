/* ==========================================================================
   EVERYTHING MEDIA — script.js
   GSAP-powered timeline, scrub nav, cinema takeover, horizontal method,
   custom crosshair cursor, preloader, sound toggle, form.
   ========================================================================== */

(() => {
    'use strict';

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
    const isMobile = window.innerWidth <= 768;

    gsap.registerPlugin(ScrollTrigger);

    /* =========================================================
       PRELOADER — frame expands, then content reveals
       ========================================================= */
    const preloader = document.getElementById('preloader');
    const plCount = document.getElementById('pl-count');
    const MIN_PRELOAD = 1800;
    const start = Date.now();

    let counter = 1;
    const counterInterval = setInterval(() => {
        counter++;
        if (counter > 24 || !plCount) {
            clearInterval(counterInterval);
            return;
        }
        plCount.textContent = String(counter).padStart(2, '0');
    }, 50);

    const finishPreload = () => {
        const elapsed = Date.now() - start;
        const remaining = Math.max(0, MIN_PRELOAD - elapsed);
        setTimeout(() => {
            clearInterval(counterInterval);
            preloader.classList.add('expanding');
            setTimeout(() => {
                preloader.classList.add('done');
                document.body.classList.remove('loading');
                initHeroSequence();
            }, 1100);
        }, remaining);
    };

    document.body.classList.add('loading');

    if (document.readyState === 'complete') {
        finishPreload();
    } else {
        window.addEventListener('load', finishPreload);
    }

    /* =========================================================
       HERO — wordmark letter-by-letter cut-in + stills rotation
       ========================================================= */
    function typesetWordmark() {
        const letterWraps = document.querySelectorAll('.wm-letters');
        letterWraps.forEach((wrap) => {
            const word = wrap.dataset.word;
            if (!word) return;
            wrap.innerHTML = '';
            word.split('').forEach((ch) => {
                const span = document.createElement('span');
                span.className = 'wm-letter' + (ch === ' ' ? ' space' : '');
                span.textContent = ch;
                wrap.appendChild(span);
            });
        });
    }
    typesetWordmark();

    function initHeroSequence() {
        // Reveal scrubnav, topbar, sound toggle
        document.getElementById('scrubnav').classList.add('visible');
        document.querySelector('.topbar').classList.add('visible');
        document.getElementById('sound-toggle').classList.add('visible');

        // Wordmark: letters appear in sequence with hard cuts (no fade), subtle stagger
        const letters = document.querySelectorAll('.wm-letter');
        letters.forEach((letter, i) => {
            setTimeout(() => letter.classList.add('revealed'), 280 + i * 55);
        });

        // Sub line fades in after wordmark is done
        setTimeout(() => {
            document.getElementById('entry-sub').classList.add('in');
        }, 280 + letters.length * 55 + 200);

        // Bottom strip
        setTimeout(() => {
            document.querySelector('.entry-bottom').classList.add('in');
        }, 280 + letters.length * 55 + 600);

        // Start hero stills cycle
        initEntryStills();
    }

    function initEntryStills() {
        const stills = document.querySelectorAll('.entry-still');
        const metaEl = document.getElementById('entry-meta');
        if (!stills.length) return;

        let i = 0;
        const setActive = (n) => {
            stills.forEach((s, k) => {
                if (k === n) {
                    s.classList.add('active', 'flash');
                    if (metaEl) metaEl.textContent = s.dataset.meta || '';
                    setTimeout(() => s.classList.remove('flash'), 160);
                } else {
                    s.classList.remove('active');
                }
            });
        };
        setActive(0);
        if (reducedMotion) return;
        setInterval(() => {
            i = (i + 1) % stills.length;
            setActive(i);
        }, 4800);
    }

    /* =========================================================
       CURSOR — crosshair / viewfinder / dot / type-cursor
       ========================================================= */
    const cursor = document.getElementById('cursor');
    const curLabel = cursor ? cursor.querySelector('.cur-label') : null;

    if (!isTouch && !reducedMotion && cursor) {
        let mx = window.innerWidth / 2;
        let my = window.innerHeight / 2;
        let cx = mx, cy = my;

        window.addEventListener('mousemove', (e) => {
            mx = e.clientX;
            my = e.clientY;
        });

        const lerp = (a, b, t) => a + (b - a) * t;
        const tick = () => {
            cx = lerp(cx, mx, 0.25);
            cy = lerp(cy, my, 0.25);
            cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
            requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);

        // data-cursor elements
        document.querySelectorAll('[data-cursor]').forEach((el) => {
            const type = el.dataset.cursor;
            const label = el.dataset.label || type;
            el.addEventListener('mouseenter', () => {
                cursor.classList.remove('link', 'type', 'viewfinder');
                if (type === 'view') cursor.classList.add('viewfinder');
                else if (type === 'type') cursor.classList.add('type');
                else cursor.classList.add('viewfinder');
                if (curLabel) curLabel.textContent = label;
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('viewfinder', 'type', 'link');
                if (curLabel) curLabel.textContent = '';
            });
        });

        // regular links/buttons/inputs → small dot
        document.querySelectorAll('a:not([data-cursor]), button:not([data-cursor]), input, textarea, select, .sn-tick').forEach((el) => {
            el.addEventListener('mouseenter', () => cursor.classList.add('link'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('link'));
        });

        // hide cursor at window edges
        document.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; });
        document.addEventListener('mouseenter', () => { cursor.style.opacity = '1'; });
    } else if (cursor) {
        cursor.remove();
        document.body.style.cursor = 'auto';
    }

    /* =========================================================
       SCRUBNAV — section tracking + timecode
       ========================================================= */
    const snFill = document.getElementById('sn-fill');
    const snCurrent = document.getElementById('sn-current');
    const snTime = document.getElementById('sn-time');
    const ticks = document.querySelectorAll('.sn-tick');

    const sections = Array.from(ticks).map((t) => ({
        el: document.querySelector(t.dataset.target),
        tick: t,
        label: t.dataset.label
    }));

    const formatTimecode = (progress) => {
        const total = Math.round(progress * 3600); // 0 → 1:00:00
        const h = Math.floor(total / 3600).toString().padStart(2, '0');
        const m = Math.floor((total % 3600) / 60).toString().padStart(2, '0');
        const s = Math.floor(total % 60).toString().padStart(2, '0');
        return `${h}:${m}:${s}`;
    };

    let scrollTicking = false;
    const onScroll = () => {
        if (scrollTicking) return;
        scrollTicking = true;
        requestAnimationFrame(() => {
            const y = window.scrollY;
            const max = document.documentElement.scrollHeight - window.innerHeight;
            const p = Math.min(1, Math.max(0, y / max));

            if (snFill) snFill.style.height = (p * 100) + '%';
            if (snTime) snTime.textContent = formatTimecode(p);

            // determine which section is most visible
            let activeIdx = 0;
            sections.forEach((sec, i) => {
                if (!sec.el) return;
                const r = sec.el.getBoundingClientRect();
                if (r.top < window.innerHeight * 0.4 && r.bottom > window.innerHeight * 0.3) {
                    activeIdx = i;
                }
            });

            ticks.forEach((t, i) => t.classList.toggle('active', i === activeIdx));
            if (snCurrent && sections[activeIdx]) snCurrent.textContent = sections[activeIdx].label;

            scrollTicking = false;
        });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // click scrubnav ticks to jump
    ticks.forEach((t) => {
        t.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(t.dataset.target);
            if (target) target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
        });
    });

    /* =========================================================
       POSITIONING — shot-reverse-shot reveal
       ========================================================= */
    const posThesis = document.querySelector('.pos-thesis');
    const posCaption = document.getElementById('pos-caption');
    if (posThesis) {
        ScrollTrigger.create({
            trigger: posThesis,
            start: 'top 70%',
            onEnter: () => {
                document.getElementById('pt-tools').classList.add('reveal');
                setTimeout(() => document.getElementById('pt-taste').classList.add('reveal'), 360);
                setTimeout(() => posCaption.classList.add('in'), 1100);
            }
        });
    }

    /* =========================================================
       CINEMA MODE — pin screen, cross-fade slides, letterbox expand
       ========================================================= */
    const cinema = document.getElementById('cinema');
    const cinemaSlides = document.querySelectorAll('.cinema-slide');
    const cpFill = document.getElementById('cp-fill');

    if (cinema && cinemaSlides.length && !isMobile) {
        const totalSlides = cinemaSlides.length;

        ScrollTrigger.create({
            trigger: cinema,
            start: 'top top',
            end: 'bottom bottom',
            onEnter: () => cinema.classList.add('active'),
            onEnterBack: () => cinema.classList.add('active'),
            onLeave: () => cinema.classList.remove('active'),
            onLeaveBack: () => cinema.classList.remove('active'),
            onUpdate: (self) => {
                const p = self.progress; // 0..1 across the whole cinema section
                if (cpFill) cpFill.style.width = (p * 100) + '%';

                // which slide?
                const idx = Math.min(totalSlides - 1, Math.floor(p * totalSlides));
                cinemaSlides.forEach((s, i) => {
                    const wasActive = s.classList.contains('active');
                    if (i === idx) {
                        if (!wasActive) {
                            s.classList.add('active', 'flash');
                            setTimeout(() => s.classList.remove('flash'), 180);
                        }
                    } else {
                        s.classList.remove('active');
                    }
                });
            }
        });
    }

    /* =========================================================
       METHOD — horizontal timeline pin + scroll-linked transform
       ========================================================= */
    const timelinePin = document.getElementById('timeline-pin');
    const tlSteps = document.getElementById('tl-steps');
    const tlFill = document.getElementById('tl-fill');
    const tlStepArr = document.querySelectorAll('.tl-step');

    if (timelinePin && tlSteps && !isMobile) {
        // total horizontal travel: width of steps minus viewport width
        const calcTravel = () => tlSteps.scrollWidth - window.innerWidth + parseInt(getComputedStyle(document.documentElement).fontSize) * 8;

        ScrollTrigger.create({
            trigger: timelinePin,
            start: 'top top',
            end: 'bottom bottom',
            onUpdate: (self) => {
                const p = self.progress;
                const travel = calcTravel();
                gsap.set(tlSteps, { x: -p * travel });
                if (tlFill) tlFill.style.width = (p * 100) + '%';

                // activate current step based on progress
                const stepProgress = p * tlStepArr.length;
                const activeStepIdx = Math.min(tlStepArr.length - 1, Math.floor(stepProgress));
                tlStepArr.forEach((s, i) => s.classList.toggle('active', i === activeStepIdx));
            }
        });

        window.addEventListener('resize', () => ScrollTrigger.refresh());
    }

    /* =========================================================
       CONVICTION — staggered reveal (claim → gap → landing)
       ========================================================= */
    const convClaim = document.querySelector('.conv-claim');
    const convLines = document.querySelectorAll('.conv-l');
    const convRule = document.getElementById('conv-rule');
    const convLanding = document.getElementById('conv-landing');

    if (convClaim) {
        ScrollTrigger.create({
            trigger: '.section-conviction',
            start: 'top 60%',
            onEnter: () => {
                convLines.forEach((l, i) => {
                    setTimeout(() => l.classList.add('in'), i * 220);
                });
                setTimeout(() => convRule.classList.add('in'), convLines.length * 220 + 100);
                setTimeout(() => convLanding.classList.add('in'), convLines.length * 220 + 350);
            }
        });
    }

    /* =========================================================
       MOBILE MENU
       ========================================================= */
    const tbMobile = document.getElementById('tb-mobile');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuClose = document.getElementById('menu-close');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (tbMobile) tbMobile.addEventListener('click', () => {
        mobileMenu.classList.add('open');
        document.body.style.overflow = 'hidden';
    });
    if (menuClose) menuClose.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
    });
    mobileLinks.forEach((a) => a.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
    }));

    /* =========================================================
       SOUND TOGGLE — ambient projector
       ========================================================= */
    const soundToggle = document.getElementById('sound-toggle');
    const projectorAudio = document.getElementById('projector-audio');
    const stLabel = soundToggle ? soundToggle.querySelector('.st-label') : null;

    if (soundToggle && projectorAudio) {
        soundToggle.addEventListener('click', () => {
            const state = soundToggle.dataset.state;
            if (state === 'off') {
                projectorAudio.volume = 0;
                projectorAudio.play().then(() => {
                    soundToggle.dataset.state = 'on';
                    if (stLabel) stLabel.textContent = 'sound on';
                    // gentle fade-in
                    let v = 0;
                    const fade = setInterval(() => {
                        v = Math.min(0.22, v + 0.02);
                        projectorAudio.volume = v;
                        if (v >= 0.22) clearInterval(fade);
                    }, 60);
                }).catch(() => {
                    // browser blocked autoplay or file missing — revert state
                    soundToggle.dataset.state = 'off';
                    if (stLabel) stLabel.textContent = 'no audio';
                });
            } else {
                let v = projectorAudio.volume;
                const fade = setInterval(() => {
                    v = Math.max(0, v - 0.04);
                    projectorAudio.volume = v;
                    if (v <= 0) {
                        clearInterval(fade);
                        projectorAudio.pause();
                    }
                }, 50);
                soundToggle.dataset.state = 'off';
                if (stLabel) stLabel.textContent = 'sound off';
            }
        });
    }

    /* =========================================================
       GRAIN — detect whether video loaded; if not, keep CSS fallback
       ========================================================= */
    const grainVideo = document.querySelector('.grain-video');
    const grainWrap = document.querySelector('.grain-wrap');
    if (grainVideo && grainWrap) {
        grainVideo.addEventListener('playing', () => grainWrap.classList.add('has-video'));
        grainVideo.addEventListener('error', () => {
            grainVideo.style.display = 'none';
        });
    }

    /* =========================================================
       FORM — mailto default; easy backend swap later
       ========================================================= */
    const form = document.getElementById('contact-form');
    const statusEl = document.getElementById('form-status');
    const submitBtn = form ? form.querySelector('.submit-btn') : null;

    const fields = form ? form.querySelectorAll('input, textarea, select') : [];
    fields.forEach((field) => {
        const parent = field.closest('.form-field');
        const check = () => {
            if (field.value && field.value.trim() !== '') parent.classList.add('has-value');
            else parent.classList.remove('has-value');
        };
        field.addEventListener('input', check);
        field.addEventListener('change', check);
        check();
    });

    const setStatus = (msg, type) => {
        if (!statusEl) return;
        statusEl.textContent = msg;
        statusEl.classList.remove('success', 'error');
        if (type) statusEl.classList.add(type);
        statusEl.classList.add('visible');
    };

    const submitForm = async (data) => {
        const subject = `New project — ${data.company || data.name}`;
        const body = [
            `Name: ${data.name}`,
            `Company / project: ${data.company || '—'}`,
            `Email: ${data.email}`,
            `Type: ${data.type}`,
            '',
            data.message
        ].join('\n');
        window.location.href = `mailto:hello@everythingmedia.co.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        return { ok: true };
    };

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const data = {
                name: form.elements['name'].value.trim(),
                company: form.elements['company'].value.trim(),
                email: form.elements['email'].value.trim(),
                type: form.elements['type'].value,
                message: form.elements['message'].value.trim()
            };

            if (!data.name || !data.email || !data.type || !data.message) {
                setStatus('please fill in the required fields.', 'error');
                return;
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
                setStatus('that email doesn\'t look right.', 'error');
                return;
            }

            submitBtn.classList.add('sending');
            setStatus('opening your email…', null);

            try {
                const res = await submitForm(data);
                if (res.ok) {
                    setStatus('sent. we\'ll reply soon.', 'success');
                    form.reset();
                    fields.forEach((f) => f.closest('.form-field').classList.remove('has-value'));
                } else {
                    setStatus('something went wrong. write us at hello@everythingmedia.co.in', 'error');
                }
            } catch (err) {
                setStatus('something went wrong. write us at hello@everythingmedia.co.in', 'error');
            } finally {
                submitBtn.classList.remove('sending');
            }
        });
    }

    /* =========================================================
       SMOOTH SCROLL on in-page anchors (native, not library)
       ========================================================= */
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener('click', (e) => {
            const id = link.getAttribute('href');
            if (id.length <= 1) return;
            const t = document.querySelector(id);
            if (t) {
                e.preventDefault();
                t.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
            }
        });
    });

})();
