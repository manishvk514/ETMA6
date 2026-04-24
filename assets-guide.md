# Assets Guide — grain loop + projector sound

There are two files the site expects but I cannot generate for you: the 35mm grain video loop and the ambient projector audio. The site works without them (the CSS fallback grain kicks in, the sound toggle turns itself off). But if you want the full experience, here's exactly where to get them.

---

## 1. `grain.mp4` — the 35mm film grain loop

This is the most impactful visual detail on the site. Real grain reads differently from CSS-generated grain — it has weight, softness, and the randomness of actual photochemical film. It costs nothing to add and transforms the whole page.

### What to look for

- **Duration:** 8–20 seconds, seamlessly loopable
- **Resolution:** 1080p minimum, 4K preferred (the overlay is full-screen)
- **Color:** pure monochrome grain on a mid-gray or black background (the CSS uses `mix-blend-mode: overlay`, so black and white inputs work best)
- **Format:** MP4 (H.264), under 8MB ideally
- **Style:** 16mm or 35mm film grain. Avoid "digital noise" or "TV static" packs — they look wrong on a cinematic site.

### Where to get it (free)

**Option A — Pexels (free, no attribution required for use)**
1. Go to https://www.pexels.com/search/videos/film%20grain/
2. Look for videos tagged "16mm grain" or "35mm grain overlay"
3. Download the 1080p version

**Option B — Mixkit (free, no account needed)**
1. https://mixkit.co/free-stock-video/ — search "grain overlay"

**Option C — Pixabay**
1. https://pixabay.com/videos/search/film%20grain/

### Where to get it (paid, highest quality)

**Motion Array** ($29/mo subscription, cancel anytime)
- https://motionarray.com/browse/film-grain-overlays/
- Their 4K overlays are industry-standard. This is what professional studios use.

**Storyblocks**
- https://www.storyblocks.com/video/stock/film-grain

### How to use it

1. Download a suitable `.mp4` file
2. Rename it to exactly `grain.mp4`
3. Drop it in the project root folder (same level as `index.html`)
4. Commit to GitHub → Vercel auto-redeploys → grain is live

### If you want to optimize it

Before uploading, run the file through https://handbrake.fr (free) to compress it. A 10-second 1080p grain loop should be 2–4MB, not 20MB. Settings:

- Format: MP4
- Video codec: H.264
- Quality: RF 26–28 (higher is smaller file)
- Audio: remove entirely (grain has no sound)

---

## 2. `projector.mp3` — the ambient projector sound

This is the audio that plays at low volume when the sound toggle is on. It's a key detail but 100% optional — the site respects the toggle state.

### What to look for

- **Duration:** 20–60 seconds, seamlessly loopable (the code loops it automatically)
- **Content:** warm, soft film projector reel whir. NOT a dramatic clicking sound. Think: the very faint mechanical hum of a projector in a cinema, at the back of the room, barely audible.
- **Format:** MP3, 128kbps is fine (this is ambient background audio, not music)
- **File size:** under 1MB

### Where to get it (free)

**Option A — Freesound (requires free account)**
1. Go to https://freesound.org and search for "film projector loop" or "16mm projector ambient"
2. Recommended searches: "projector loop", "cinema projector ambient", "super 8 projector"
3. Filter by Creative Commons 0 (no attribution needed) for easy use
4. Download as MP3 or convert from WAV if needed

**Option B — Pixabay Music**
1. https://pixabay.com/sound-effects/search/projector/

**Option C — YouTube Audio Library** (free, no account)
1. https://www.youtube.com/audiolibrary — search "projector"

### How to use it

1. Download a suitable sound file
2. If it's a WAV, convert to MP3 using https://cloudconvert.com (free)
3. Rename to exactly `projector.mp3`
4. Drop in the project root folder
5. Commit → deploy → sound toggle now works

### Note on browser autoplay

Browsers block audio autoplay. That's why the sound toggle exists — it requires a user click. The site is designed to respect this. Do not try to make it autoplay; it will be blocked and looks broken.

### If you want to get fancy

You can layer in additional ambient elements — a very soft room tone, a barely-audible tape hiss — and mix them into a single file using Audacity (free: https://www.audacityteam.org/). Keep the final mix at about -24dB so it sits quietly behind the interaction without dominating.

---

## 3. Hero and work images — see `midjourney-prompts.md`

The hero slideshow currently uses Unsplash placeholders. Generate the six cinematic stills using the Midjourney prompts in the separate file, save them somewhere permanent, and update the `background-image` URLs in `index.html`.

For the work tiles: replace the Unsplash URLs with frames from your actual JioStar, Hero Vida, Krishna, Surili Didi, and any spec work when you have them.

---

## Summary — files the project looks for

| File | Required? | What happens if missing |
|---|---|---|
| `grain.mp4` | Optional | CSS grain fallback activates |
| `projector.mp3` | Optional | Sound toggle disables gracefully |
| Hero images | Replaces Unsplash URLs | Shows placeholder stills |
| Work images | Replaces Unsplash URLs | Shows placeholder stills |

You can deploy the site **right now** without any of these — it will render beautifully with CSS grain and placeholder images. Each asset you add makes it more cinematic. None of them block launch.
