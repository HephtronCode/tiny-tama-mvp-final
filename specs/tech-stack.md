# Tech Stack: Tiny Tamagotchi MVP

## Frontend Framework
*   **Vite + React (Vanilla JavaScript):** Chosen for lightning-fast HMR and minimal boilerplate during a 7-day sprint.
*   **State Management:** Native **React Hooks** (`useState`, `useEffect`, `useContext`) will handle the 0-100 stat engine and state transitions. No external state libraries (like Redux or Zustand) are required for this MVP scope.

## Animations
*   **Framer Motion:** Used for physics-based, high-quality animations including idle breathing, state transitions, and interactive touch reactions (jumping).

## Styling & UI Components
*   **Tailwind CSS v4:** Integrated via the `@tailwindcss/vite` plugin for a zero-runtime, utility-first styling approach.
*   **shadcn/ui:** Used for accessible, high-quality UI primitives (Progress Bars, Buttons, Cards).
    *   **Configuration:** Custom `components.json` set to `"tsx": false` to support the Vanilla JavaScript requirement.
*   **Lucide React:** Icon library for intuitive visual feedback on action buttons.

## Core Logic & Algorithms
*   **Stat Degradation:** A simple `setInterval` loop to decrement Hunger, Happiness, and Energy every few seconds.
*   **State Machine:** Managed via React state to transition between **Normal**, **Sick**, **Evolving**, and **Puppy**.
*   **Persistence:** **SQLite WASM (OPFS)** for robust, persistent local storage of vitals, growth progress, and pet name.

## Development Tools
*   **Package Manager:** `npm` for dependency management.
*   **Internal Verification:** A custom "Debug Panel" to manipulate time and trigger evolution thresholds for QA.

## Dependencies (Latest Standards)
*   `vite`
*   `react` & `react-dom`
*   `framer-motion`
*   `@sqlite.org/sqlite-wasm`
*   `tailwindcss` & `@tailwindcss/vite`
*   `class-variance-authority`, `clsx`, `tailwind-merge` (shadcn/ui core)
*   `lucide-react`

