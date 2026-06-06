# Float Goat

A gesture-controlled browser game where you use your hands to keep a ball in the air. No keyboard, no mouse, just your webcam.

Built with TensorFlow.js and MediaPipe Hands for real-time hand tracking, styled with a Japanese city pop aesthetic.

---

## How to Play

1. Allow camera access when prompted
2. Click **Start Game**
3. Move your hands in front of the camera to bounce the ball
4. Survive as long as possible - your score is measured in seconds

---

## Tech Stack

- **TensorFlow.js** - machine learning in the browser
- **MediaPipe Hands** - real-time hand landmark detection
- **HTML5 Canvas** - game rendering
- **Vanilla JavaScript** - game logic and physics
- **CSS** - city pop UI with neon aesthetics

---

## Running Locally

You must run this on a local server - opening `index.html` directly from the file system will block camera access.

**Option 1 — VS Code Live Server**
Install the Live Server extension, right-click `index.html` → Open with Live Server.

**Option 2 — Python**
```bash
python -m http.server 8000
```
Then open `http://localhost:8000`

**Option 3 — Node**
```bash
npx serve .
```

---

## Project Structure

```
├── index.html        # Game layout and script imports
├── style.css         # City pop UI styles
├── game.js           # Game loop, physics, scoring
└── handTracking.js   # Webcam and MediaPipe hand detection
```

---

## Browser Support

| Browser | Support |
|---|---|
| Chrome (desktop) | ✅ Full |
| Edge (desktop) | ✅ Full |
| Firefox | ✅ Full |
| Safari 15+ | ✅ Full |
| Chrome (Android) | ✅ Good |
| iOS Safari | ⚠️ May be slow |

> Hand tracking is CPU-intensive. Desktop is recommended for the best experience.

---

## Deployment

Deployed on [Vercel](https://vercel.com). Camera access requires HTTPS, which Vercel provides automatically.
