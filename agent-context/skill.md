# Technical Mastery: Tiny Puppy Core Architecture

## 🚀 Framework & Build Environment
- **Vite + React (Vanilla JS):** Optimized for zero-boilerplate, high-speed HMR. Leveraging React 19 features for seamless state management without external overhead.
- **Spec-Driven Development (SDD):** A rigorous workflow where every mechanical threshold (e.g., 3s Hunger decay) is documented in feature specs before implementation.

## 🎭 High-Fidelity Animation System (Framer Motion)
- **Physics-Based Variants:** Implementation of `motion.div` with spring-based transitions for a "squish and stretch" feel.
- **State-Driven Animation Engine:**
  - `idle`: Gentle sine-wave bobbing (`y: [0, -10, 0]`).
  - `sick`: Low-frequency, grayscale-filtered wobbling (`rotate: [-5, 5]`).
  - `hangry`: High-frequency, urgent jittering (`x: [-1, 1]`).
  - `evolving`: Rapid scaling and rotation to simulate a "cracking" box.
  - `jump`: Interactive spring-based vertical launch (`y: [0, -40, 0]`).
  - `dreaming`: Translucent, floating effect triggered by 60s idle time.

## 💾 Browser-Native Persistence (SQLite WASM / OPFS)
- **Origin Private File System (OPFS):** Direct binary storage in the browser, bypassing the size and speed limits of LocalStorage.
- **Transactional State Logic:**
  - `saveVitals`: Atomic updates to the `vitals` table including `name`, `action_count`, and `life_stage`.
  - `loadVitals`: Immediate recovery of session state on component mount.
  - **Auto-Sync:** A background 10s "heartbeat" save to capture natural stat decay.

## 🧩 Advanced Logic & Algorithms
- **Staggered Decay Algorithm:** Independent interval-based depletion (`3s`, `7s`, `10s`) to ensure non-synchronous vitals movement, adding "organic" unpredictability.
- **Nursing Mechanic (The 50% Threshold):** A specific state lock requiring Energy to hit 50% and all other stats to be > 0 before unlocking the "Normal" status.
- **Rolling Timing Window (The Heart Shower):** A 5,000ms history filter using `useRef` to detect comprehensive care patterns (Feed + Play + Rest) without re-renders.

## 🎨 Aesthetic & UI Philosophy
- **Tailwind CSS v4:** Using the latest utility-first primitives for zero-runtime overhead.
- **Context-Aware UI:** Dynamic disabling of action buttons based on status (Sick locks all except Cure/Rest).
- **Responsive "Card" Architecture:** A rounded, polished UI that adapts from desktop to small mobile viewports with `min-w` and `max-w` constraints.
