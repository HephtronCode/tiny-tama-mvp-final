# 🥚 Tiny Tama: A Living MVP
> **The 7-Day Challenge: From Specification to Implementation.**

Tiny Tama is a high-visual, low-stress virtual pet experience. It was built using a **Spec-Driven Development (SDD)** workflow, where every mechanic—from the 500ms interaction lock to the staggered 0-100 stat decay—was defined and validated in documentation before the first line of code was written.

---

## 🎯 The Mission
To create a "digital desk pet" for children and young adults. Tiny Tama prioritizes **coziness** over challenge:
- **No Permanent Death:** The pet can become "Sick" but never dies.
- **Intuitive Feedback:** High-visual cues (emojis, color shifts, particle effects).
- **Meaningful Growth:** A permanent evolution milestone at 10 care actions.

---

## 🏗️ System Architecture

### 1. The Tech Stack (Modern & Minimal)
- **Framework:** Vite + React (Vanilla JS) for maximum agility.
- **Styling:** **Tailwind CSS v4** + **shadcn/ui** for a polished, component-driven UI.
- **Database:** **SQLite (Wasm/OPFS)**. A "native" database approach using the browser's Origin Private File System for robust, persistent local storage.
- **Celebration:** `canvas-confetti` for milestone rewards.

### 2. The State Engine (Vitals & Identity)
The application operates on a strict state machine defined in `/vitals/requirements.md`:
- **Staggered Decay:** 
  - 🍕 **Hunger:** -1 every 3s
  - 🧸 **Happiness:** -1 every 7s
  - ⚡ **Energy:** -1 every 10s
- **Thresholds:**
  - **Sick State:** Triggered if `any vital == 0`.
  - **Hangry Jitter:** Triggered if `hunger < 10%`.
  - **Dreamer State:** Triggered by 60s of inactivity while healthy (>80% all stats).

---

## 🕹️ Gameplay Mechanics

### The Care Loop
Every interaction (+10 points) is governed by a **500ms animation lock** to ensure the user feels the weight of their care actions.
- **Feed:** Increases Hunger.
- **Play:** Increases Happiness.
- **Rest/Cure:** Increases Energy and serves as the exclusive recovery path from the "Sick" state.

### Evolution
The pet's life begins as an **Egg**. Upon reaching **10 successful care actions** while healthy, the pet enters a 2-second "Hatch" sequence, permanently evolving into a **Creature (🦖)**.

### Secret Easter Eggs
- **Heart Shower:** Perform all 3 actions (Feed, Play, Rest) within 5 seconds to trigger a burst of hearts.
- **Zzz Dreaming:** Leave the pet healthy and idle to watch it drift into a peaceful sleep.

---

## 🛠️ Development & Verification

### Running the App
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run automated smoke tests
npm test
```

### The Internal Verification Tool (Dev Console)
To ensure we could hit the 7-day deadline, we built a hidden **Debug Console** (toggleable in the footer). It allows for:
- **Time Warping:** Accelerate the game logic by 10x.
- **State Manipulation:** Instantly drain/fill stats or trigger evolution.
- **Verification:** Empirically proves the 5-minute survival and 10-action growth criteria.

---

## 📂 Project Structure
```text
├── care-loop/         # Feature Specs: Interaction logic
├── dynamic-state/     # Feature Specs: Evolution & Sick states
├── vitals/            # Feature Specs: Stat decay & boundaries
├── specs/             # Core Mission, Roadmap, and Tech Stack
├── src/
│   ├── components/ui/ # shadcn/ui primitives
│   ├── App.jsx        # The Heart: Main State Controller
│   ├── db.js          # The Memory: SQLite Wasm Manager
│   └── main.jsx       # Entry Point
└── README.md          # This Living Document
```

---
*Created as part of the 7-Day Spec-Driven Development Challenge. Sundays are for hatching eggs.*
