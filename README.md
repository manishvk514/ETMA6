# Everything Media — website

Static site. No framework. No build step.

---

## Files

```
everything-media/
├── index.html             the site
├── style.css              the design system
├── script.js              GSAP animations + interactions
├── vercel.json            hosting headers
├── README.md              this file
├── assets-guide.md        how to source grain.mp4 and projector.mp3
└── midjourney-prompts.md  prompts for your hero and work images
```

Optional files (add these anytime after deploy for the full experience):
- `grain.mp4` — real 35mm film grain loop (see `assets-guide.md`)
- `projector.mp3` — ambient projector sound (see `assets-guide.md`)

---

## Deploy to Vercel via GitHub — full steps

### Step 1 — Put the files on GitHub

1. Go to **github.com** → sign up (free)
2. Click the green **New** button top-left, or go to **github.com/new**
3. Repository name: `everything-media`
4. Set to **Public**
5. Check **Add a README file**
6. Click **Create repository**
7. On the repo page, click **Add file** → **Upload files**
8. **Drag all 7 files** from this `everything-media` folder into the upload window
9. Scroll down, click **Commit changes**

### Step 2 — Deploy via Vercel

1. Go to **vercel.com** → sign up with **Continue with GitHub**
2. Authorize when prompted
3. On the dashboard, **Add New...** → **Project**
4. Find `everything-media` in the repo list → **Import**
5. Don't change anything on the config screen. Click **Deploy**
6. ~40 seconds later, the site is live at `everything-media.vercel.app`

### Step 3 — Connect your domain

1. In the Vercel project → **Settings** → **Domains**
2. Type `everythingmedia.co.in` → **Add**
3. Vercel shows 1–2 DNS records. Usually:
   - A record: host `@` → value `76.76.21.21`
   - CNAME record: host `www` → value `cname.vercel-dns.com`
4. Go to your domain registrar (wherever you bought the domain)
5. Find **DNS settings**, add the records Vercel showed you
6. Save. Wait 10 minutes to 24 hours. HTTPS auto-provisions the moment DNS resolves.

---

## Updating the site later

Every future change = edit a file on GitHub in your browser:

1. Go to your repo: `github.com/your-username/everything-media`
2. Click any file (e.g., `index.html`) → click the **pencil icon** (top right)
3. Make changes → scroll down → **Commit changes**
4. Vercel auto-redeploys in 30 seconds

No code editor. No terminal. No git commands.

---

## Replacing placeholder images

All images right now are Unsplash URLs. To replace with your own:

### For hero slideshow

In `index.html`, find each `<div class="entry-still"` element and replace:
- The `style="background-image: url('...')"` URL with yours
- The `data-meta` attribute with real camera info you want shown (e.g., `"01 · 35mm · f/1.8"`)

### For work tiles

In `index.html`, find each `<img src="..."` inside the `.cinema-slides` section. Replace the URLs.

### Where to host your images

Easiest: create an `images/` folder inside your GitHub repo, upload there, and reference as `images/hero-01.jpg`.

---

## Optional — add the grain video and projector sound

These transform the site from "good" to "unforgettable." Both are detailed in `assets-guide.md`. Summary:

- `grain.mp4` — real 35mm film grain loop (Pexels, Mixkit, Motion Array)
- `projector.mp3` — ambient projector whir (Freesound, Pixabay)

Drop both in the project root, commit, redeploy. Done.

---

## Upgrading the form to a real backend

Currently the form opens the visitor's email client pre-filled. Works immediately.

When you want submissions to land in an inbox/dashboard, use **Formspree**:

1. Sign up at formspree.io (free tier fine)
2. Create a form, copy its endpoint URL
3. In `index.html`, change the form tag:
   ```html
   <form id="contact-form" class="contact-form" novalidate
         action="https://formspree.io/f/your-id" method="POST">
   ```
4. In `script.js`, find `submitForm`. Replace the body with:
   ```js
   const res = await fetch(form.action, {
       method: 'POST',
       headers: { 'Accept': 'application/json' },
       body: new FormData(form)
   });
   return { ok: res.ok };
   ```
5. Commit → redeploy.

---

## What's happening on the page

- **The entire site is letterboxed** — 2.39:1 cinemascope mattes on top and bottom, with thin red rules and corner marks, persistent across every section. You're inside a film the whole time.
- **The scrub-bar nav** on the left edge tracks your scroll position and lets you jump to any section by clicking its tick. The timecode updates in real time, running from 00:00:00 at the top to roughly 01:00:00 at the end.
- **The hero** opens with a frame that expands from tiny to full-screen (the opening shot of a film), then letters type into the "EVERYTHING MEDIA" wordmark one at a time as hard cuts.
- **The positioning section** plays "Tools change." on the left and "Taste doesn't." on the right as a shot-reverse-shot — the words reveal from opposite directions, like a cinematic cut.
- **The work section becomes a cinema** — as you enter it, black mattes expand inward, a REC indicator appears, and the five projects cross-cut one at a time as you scroll, each holding for ~100vh so you sit with the frame.
- **The method section** pins to the viewport and scrolls horizontally — five steps pass by from right to left, each activating as it reaches center, with a red progress bar tracing the timeline.
- **The conviction section** reveals its three lines with a slow blur-to-sharp animation, then draws a red rule, then lands the final small line.
- **Ambient projector sound** is off by default (respecting browser autoplay rules). The toggle in the bottom-right is almost invisible until hovered.

---

## Browser support

Chrome, Safari, Firefox, Edge — all current versions. The site uses GSAP ScrollTrigger (industry standard) which has full cross-browser support.

On mobile, the cinema-mode takeover, scrubnav, cursor, and horizontal timeline simplify into more standard vertical layouts — the concept still reads but without the pinning complexity that can jank on touch devices.

---

## Credits

Built by Manish Verma Kumawat with Claude (Anthropic).
Everything Media, 2026.
