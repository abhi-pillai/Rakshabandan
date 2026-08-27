# The Golden Thread 🪢

A personalized, single-page Rakshabandhan web gift for your sister(s) — pick a
name, scroll through a "then vs. now" photo archive, settle a few sibling
arguments with a tug-of-war slider, tie a virtual rakhi as you scroll, and
unlock a heartfelt letter (plus a hidden surprise) at the end.

Everything is plain HTML/CSS/JS — no build step, no dependencies, no server
required.

---

## 📁 Project structure

```
Rakshabandan/
├── index.html      → page structure + inline instructions
├── style.css       → all visual styling & animations
├── script.js       → all behavior — THIS IS WHERE YOU CUSTOMIZE CONTENT
├── images/         → put your photos here
└── README.md       → this file
```

## 🚀 How to view it

No installation needed. Just open `index.html` in any browser
(double-click it, or right-click → "Open with" → your browser).

To share it as a gift, you can:
- Zip the whole `Rakshabandan` folder and send it — recipient opens `index.html`.
- Or host it for free on GitHub Pages / Netlify / Vercel so it's a link she can open on her phone.

## ✍️ How to customize it

Open **`script.js`** and look for the `SIBLINGS` object near the top
(clearly marked `EDIT YOUR SIBLINGS HERE`). Add one entry per sister:

```js
const SIBLINGS = {
  archana: {
    name: "Archana",
    nickname: "Achu",
    letter: "Your heartfelt message here...",
    archive: [
      { then: "images/archana-then-1.jpg", now: "images/archana-now-1.jpg", label: "School" },
      // ...more then/now pairs
    ],
    embarrassing: [
      "images/archana-embarrassing-1.jpg",
      // ...more embarrassing photos
    ],
    arguments: [
      { title: "Who ate the last piece of cake", mine: "Your side of the story", hers: "Her side of the story" },
      // ...more sibling arguments for the tug-of-war game
    ],
  },
  // add more siblings the same way
};
```

| Field          | What it does                                                              |
|----------------|----------------------------------------------------------------------------|
| `name`         | Displayed throughout the page                                             |
| `nickname`     | Typing this anywhere on the page (after selecting her) unlocks the hidden photo montage |
| `letter`       | The personal message revealed at the very end                             |
| `archive`      | Pairs of "then" and "now" photos shown in **The Archives** section        |
| `embarrassing` | Photos shown in the hidden nickname easter egg                            |
| `arguments`    | "His version vs. her version" stories for **The Tug of War** slider game  |

### 📸 Adding photos

Drop your image files into the `images/` folder, matching the paths you
referenced in `SIBLINGS`. If a file is missing or fails to load, the page
automatically shows an elegant placeholder instead of a broken image icon —
so you can build the page before you've gathered every photo.

## 🎁 Features

- **Name gate** — the page asks who's opening it, then personalizes
  everything (hero text, letter, photos) for that sibling.
- **The Archives** — hover/tap a photo card to reveal how much has changed
  over the years.
- **Rakhi-tying scroll progress** — instead of a plain scrollbar, a small
  rakhi in the top-right corner wraps a thread around its band as you
  scroll and ties itself into a bow once you're near the bottom of the page.
- **The Tug of War** — a slider for each "argument" lets you drag between
  "his version" and "her version" of a sibling memory.
- **The Promise** — a "tie the knot" button reveals the final letter.
- **Hidden nickname easter egg** — type her nickname anywhere on the page
  (or click the floating 🥚 button that appears after she's selected) to
  unlock a hidden photo montage.

## 🛠️ Notes for developers

- All DOM building happens in `script.js`; there's no framework or bundler.
- `IntersectionObserver` is used to fade in `.reveal` elements as they
  scroll into view — including elements created dynamically (like the
  tug-of-war cards), via the reusable `observeReveals()` helper.
- The scroll-progress rakhi is driven by `updateThread()`, which maps
  scroll percentage to the wrist-band's `stroke-dashoffset` and toggles a
  `.tied` class once the band finishes wrapping, revealing the bow.
- `localStorage` is used only for a small, non-critical "knot tied"
  timestamp — the page works fine if storage is unavailable (e.g. private
  browsing).

Happy Rakshabandhan! 🎗️