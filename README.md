# Chinni Samosa — Cinematic Birthday Surprise Website
### Dedicated to My Elder Sister: *“Bangaaramuuuu”*

A custom-crafted, five-chapter cinematic interactive birthday experience. The website guides the visitor through an emerald-green mystery opening, an interactive 25-photograph memory gallery, an intimate letter with a wax-sealed envelope, an interactive birthday cake with blowing candles and celebratory particle bursts, and finally a royal-purple grand birthday reveal.

---

## 🌟 Visual Chapter Progression & Dynamic Page-Wise Coloring

Every page immerses the visitor into a distinct, atmospheric color palette:

| Chapter | Title | Color Palette | Emotional Theme |
| :--- | :--- | :--- | :--- |
| **01** | **The Secret Entrance** | Emerald Green & Mint (`#03150E`, `#087F5B`, `#A8FFD5`, `#D9B56D`) | Mystery, Anticipation, Intimacy |
| **02** | **Our Little Memories** | Obsidian Black & Radiant Gold (`#080808`, `#D9B56D`, `#F3E1B5`) | Cherished Memories, 25 Photos |
| **03** | **A Letter From My Heart** | Burgundy & Rose Gold (`#150409`, `#651C30`, `#DDA1A8`, `#FFF7F0`) | Heartfelt Emotion, Secret Final Line |
| **04** | **Make a Wish** | Emerald & Candlelight (`#03180F`, `#0B6545`, `#FFD98A`, `#FFA726`) | Magic, Birthday Cake, Blowing Candles |
| **05** | **The Final Surprise** | Royal Purple & Gold (`#0E051D`, `#39205D`, `#C5ADFF`, `#F0CB79`) | Grand Climax: *"Happy Birthday, Bangaaramuuuu!"* |

---

## 📁 Project Directory Structure

```text
chinni-samosa-birthday/
├── index.html                   # Master entrypoint with 5 chapters & modals
├── README.md                    # Project documentation & personalization guide
├── css/
│   ├── variables.css            # Dynamic page-wise palettes, typography, glows & timings
│   ├── main.css                 # Base layout, ambient lighting, navigation & audio widget
│   ├── components.css           # Cinematic buttons, photo lightbox, badges & transitions
│   └── screens.css              # Chapter-specific styling (envelope, cake, gallery, etc.)
├── js/
│   ├── config.js                # CENTRAL CONFIG: Personal texts, captions, letter, audio
│   ├── particles.js             # Canvas particle system & celebration bursts
│   ├── audio.js                 # Persistent music engine with Web Audio fallback
│   ├── gallery.js               # 25-photo grid, filtering, and interactive lightbox
│   ├── letter.js                # 3D envelope, progressive text reveal, secret line
│   ├── cake.js                  # Realistic candle flicker, extinguishing & wish card
│   ├── navigation.js            # Seamless chapter transitions & dynamic palette shifts
│   └── app.js                   # Application bootstrapper
├── photos/                      # Place your 25 personal photos here
│   ├── photo-01.jpg
│   ├── photo-02.jpg
│   └── ... photo-25.jpg         (25 high-resolution placeholders ready to replace)
└── audio/                       # Place your authorized audio track here
    ├── README.md
    └── birthday-melody.mp3      (Recommended: Samantha saree melody from 24)
```

---

## 🚀 How to Run the Website Locally

This is a clean, static front-end application with **zero external dependencies, zero build steps, and zero API keys**.

### Option 1: Direct Browser Launch
Simply double-click `index.html` or right-click `index.html` → **Open with** → Chrome / Edge / Firefox / Safari.

### Option 2: Local HTTP Server (Recommended for audio & smooth loading)
Using Python (available on your computer):
```bash
# Open terminal inside the project folder:
cd C:\Users\srish\.gemini\antigravity\scratch\chinni-samosa-birthday

# Run Python's built-in web server:
python -m http.server 8000
```
Then open your browser at:
`http://localhost:8000`

---

## 📸 How to Add All 25 Photographs

1. Prepare your 25 personal photos.
2. Name them consecutively:
   - `photo-01.jpg`
   - `photo-02.jpg`
   - `photo-03.jpg`
   - ... through `photo-25.jpg`
   *(Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`)*
3. Copy them into the `photos/` folder, replacing the temporary placeholders.
4. If you wish to customize photo titles, captions, or dates, open `js/config.js` and edit the `CONFIG.screen2.photos` array.

---

## 🎵 How to Configure Background Music

1. Obtain your authorized instrumental music file (e.g. Samantha saree scene theme from *24* composed by A. R. Rahman).
2. Save it as `birthday-melody.mp3` inside the `audio/` directory.
3. If no file is placed, the website automatically plays a soothing, built-in ambient chime synthesizer using the Web Audio API, ensuring the surprise is never silent or broken.
4. The music player starts automatically upon clicking **“Enter the Surprise ✦”** (complying with modern browser autoplay policies), smoothly ducks volume during the intimate letter reading, and remains continuous across all screen transitions without restarting.

---

## ✍️ How to Personalize the Letter & Birthday Messages

All text is organized in one central file: `js/config.js`.

- **Sister's Names & Titles**:
  ```javascript
  displayName: "Bangaaramuuuu",
  nickname: "Chinni Samosa",
  ```
- **Letter Paragraphs**:
  Edit `CONFIG.screen4.paragraphs` array to customize each line of the letter.
- **Secret Final Line**:
  Edit `CONFIG.screen4.secretFinalLine`. This line remains hidden until she clicks *"Reveal My Last Words"*.
- **Birthday Wish Message**:
  Edit `CONFIG.screen5.wishMessage` for the cake screen.
- **Final Climax Greeting**:
  Edit `CONFIG.screen6.headline` and `CONFIG.screen6.secondaryMessage`.
- **Featured Climax Photograph**:
  Set `CONFIG.screen6.featuredPhotoIndex: 24` (points to `photo-25.jpg`, or choose any index from 0 to 24).

---

## ✨ Features & Polish Checklist

- [x] Emerald-green opening with exact headline: *“Explore the Chinni Samosa's Surprise”*
- [x] All 25 photo slots configured and pre-populated with beautiful fallback cards
- [x] Interactive Lightbox with photo counter (`01 / 25`), captions, and keyboard arrows navigation
- [x] Glowing milestone timeline with connection nodes
- [x] 3D Envelope with wax seal monogram (`CS`), progressive letter unfolding, and secret reveal
- [x] Interactive Birthday Cake with realistic flickering candle flames, puffing smoke, and golden particle bursts
- [x] Grand climax screen with exact greeting: *“Happy Birthday, Bangaaramuuuu!”*
- [x] Persistent background audio manager with volume slider, equalizer bars, and letter ducking
- [x] Fully responsive layout tested for mobile portrait, tablets, and desktop
- [x] Full keyboard navigation and reduced-motion support
