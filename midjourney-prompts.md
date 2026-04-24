# Midjourney Prompts — Everything Media visual assets

These prompts are designed for generating the placeholder images across the site — specifically the hero slideshow and work tile images. They are written to produce **cinematic, editorial, genuinely premium stills** that match the brand's positioning.

**Style notes across all prompts:**

- Always include camera / lens / film-stock specification (ARRI ALEXA 35, Kodak Vision3 500T, anamorphic lens, 2.39:1 aspect ratio).
- Always include lighting language (natural daylight, practical sources, rim-lit, motivated side light).
- Always include a color grade direction (muted, de-saturated, warm bone highlights, cool shadows).
- Always specify **no text, no graphics, no UI, no watermark**.
- Use `--ar 21:9` for the full-width hero stills. Use `--ar 16:9` for standard stills.
- Use `--style raw --s 250 --q 2` for maximum cinematic realism.
- Always add negative prompt: `--no text, logo, watermark, signature`.

---

## SET A — Hero slideshow (5 stills, rotating)

The hero shows one still at a time, hard-cutting with a 1-frame white flash between. The five stills should feel like frames pulled from five different films — a reel that implies range.

### Hero Still 01 — Wide establishing, architectural

```
A vast dimly lit interior space — modernist brutalist architecture, concrete pillars receding into distance, a single solitary figure silhouetted in the mid-ground dwarfed by scale, dust particles visible in a single shaft of cool blue daylight from high above, deep teal-grey shadows, warm bone-white highlight on the floor plane, shot on ARRI ALEXA 35, anamorphic 40mm lens, Kodak Vision3 500T film stock, 2.39:1 cinemascope aspect ratio, muted desaturated palette, heavy atmospheric mood, cinematic restraint, no text, no graphics, no watermark --ar 21:9 --style raw --s 350
```

### Hero Still 02 — Intimate human portrait

```
Extreme close portrait of a person's face, three-quarter profile, eyes looking just past the camera, natural window light falling across one side of the face, skin texture rendered with delicate detail, subtle film grain, shallow depth of field with the background falling into darkness, muted brown and cream tones, a single warm highlight catching the eye, shot on ARRI ALEXA 35, 85mm Cooke Panchro lens, f/2.0, Kodak Vision3 500T, 2.39:1 cinemascope, editorial portrait quality, cinematic stillness, no text, no graphics, no watermark --ar 21:9 --style raw --s 400
```

### Hero Still 03 — Motion moment

```
A single figure running through a rain-soaked street at night, captured in a held wide shot with controlled motion blur on the subject only, wet pavement reflecting warm neon from above, streetlights forming a receding perspective into mist, cold blue-green shadows contrasting with saturated amber streetlamp glow, cinematic urban atmosphere, shot on ARRI ALEXA 35, 35mm lens, 1/25 shutter for motion on subject, anamorphic lens flare, Kodak Vision3 250D pushed one stop, 2.39:1 cinemascope, Blade Runner and Nocturne energy, no text, no graphics, no watermark --ar 21:9 --style raw --s 400
```

### Hero Still 04 — Object detail

```
Extreme close-up of an ordinary object rendered as sacred — an old wristwatch face resting on weathered leather, shallow shot from slight high angle, single warm light source from upper right, deep black shadows, sharp focus on the watch face, leather texture falling into soft focus, muted bone and brass palette, shot on ARRI ALEXA 35, 100mm macro lens, f/2.8, Kodak Vision3 500T, 2.39:1 cinemascope, stillness and weight, editorial still-life, no text, no graphics, no watermark --ar 21:9 --style raw --s 350
```

### Hero Still 05 — Landscape mood

```
A solitary tree on a windswept ridge at last light, low horizon, massive evocative cloud bank in middle distance, golden-hour light raking across the grass from camera right, long deep shadows, muted warm palette tending toward umber and faded green, atmospheric haze softening the distance, shot on ARRI ALEXA 35, 24mm anamorphic lens, Kodak Vision3 250D, 2.39:1 cinemascope, Terrence Malick quality, meditative and cinematic, no text, no graphics, no watermark --ar 21:9 --style raw --s 350
```

---

## SET B — Work tile placeholder stills

Replace the moment you have real frames from JioStar / Hero Vida / Krishna / Surili Didi.

### JioStar placeholder (brand film)

```
A family of three seen in silhouette from behind, sitting on a couch watching a bright screen that illuminates the room with shifting color — warm amber from one moment, cool blue from another — the room itself in deep shadow, shot from a low angle behind them, 2.39:1 widescreen composition, modern Indian middle-class living room details softly implied, warm intimate cinematic tone, shot on ARRI ALEXA 35, 35mm lens, Kodak Vision3 500T, no text, no graphics, no watermark --ar 21:9 --style raw --s 350
```

### Hero Vida placeholder (campaign)

```
A modern electric motorcycle in three-quarter view, parked on an empty asphalt road in the blue hour before dawn, practical streetlamps casting warm amber pools on wet road surface, distant fog softening the horizon, motorcycle shown in sharp detail with dramatic rim light outlining its contours, cool blue ambient shadow with single warm amber light source, editorial automotive photography quality, shot on ARRI ALEXA 35, 50mm lens, Kodak Vision3 250D, 2.39:1 cinemascope, premium automotive commercial mood, no text, no graphics, no watermark, no logos --ar 16:9 --style raw --s 350
```

### Krishna placeholder (director test)

```
A mythological figure rendered with photorealistic detail, luminous blue-toned skin subtly glowing from within, seen in half profile looking upward toward an unseen source of light above camera, held in absolute stillness, traditional ornaments rendered with fine detail, warm golden hour light falling on one side of the face with deep cool shadows on the other, muted sacred atmosphere, shot on ARRI ALEXA 35, 85mm lens, f/2.0, Kodak Vision3 500T, 2.39:1 cinemascope, Baahubali and Arcane visual quality, cinematic mythological portrait, no text, no graphics, no watermark --ar 16:9 --style raw --s 400
```

### Surili Didi placeholder (animation)

```
A warm, hand-painted 3D character — an animated elder sister figure in her mid-twenties with a kind expression, dressed in soft everyday Indian clothing, seated in a sun-drenched domestic interior with warm painterly textures, soft rim light outlining her silhouette, Pixar quality rendering with hand-painted sensibilities, warm cream and terracotta palette, background softly defocused, 2.39:1 widescreen composition, cinematic animation still, no text, no graphics, no watermark --ar 16:9 --style raw --s 400
```

### Untitled spec placeholder (short film)

```
A single abandoned object in a wide empty landscape — an old upright piano standing alone in the middle of a vast salt flat at golden hour, impossibly beautiful, surreal in its isolation, long soft shadows cast across the cracked salt surface, warm amber light from low sun, vast blue sky with delicate cloud texture, shot on ARRI ALEXA 35, 24mm lens, Kodak Vision3 250D, 2.39:1 cinemascope, surrealist cinematic composition, Tarkovsky and Malick quality, no text, no graphics, no watermark --ar 21:9 --style raw --s 450
```

---

## Where to upload the generated images

1. **GitHub repo approach (recommended):** create a folder called `images/` in your repo, upload the generated images there, and reference them in `index.html` as `images/hero-01.jpg` etc.
2. **Cloudinary or imgix:** host there, copy URLs, paste into `index.html`.

## Suggested naming convention

```
images/
├── hero-01.jpg        (2400×1030)
├── hero-02.jpg
├── hero-03.jpg
├── hero-04.jpg
├── hero-05.jpg
├── work-jiostar.jpg   (2400×1030)
├── work-vida.jpg      (2400×1030)
├── work-krishna.jpg   (2400×1030)
├── work-surili.jpg    (2400×1030)
└── work-untitled.jpg  (2400×1030)
```

## What to avoid

- No text on images
- No logos, watermarks, signatures
- No recognizable real people
- Avoid default "Midjourney cinematic" over-glossy look — push toward muted, controlled, photochemical
