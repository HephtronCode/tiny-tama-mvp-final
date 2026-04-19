# Tech Stack: Tiny Tamagotchi MVP

## Frontend Framework
*   **Vite + React (Vanilla JavaScript):** Chosen for lightning-fast HMR and minimal boilerplate during a 7-day sprint.
*   **State Management:** Native **React Hooks** (`useState`, `useEffect`, `useContext`) will handle the 0-100 stat engine and state transitions. No external state libraries (like Redux or Zustand) are required for this MVP scope.

## Styling & UI Components
*   **Tailwind CSS v4:** Integrated via the `@tailwindcss/vite` plugin for a zero-runtime, utility-first styling approach.
*   **shadcn/ui:** Used for accessible, high-quality UI primitives (Progress Bars, Buttons, Cards).
    *   **Configuration:** Custom `components.json` set to `"tsx": false` to support the Vanilla JavaScript requirement.
*   **Lucide React:** Icon library for intuitive visual feedback on action buttons.

## Core Logic & Algorithms
*   **Stat Degradation:** A simple `setInterval` or `requestAnimationFrame` loop to decrement Hunger, Happiness, and Energy every few seconds.
*   **State Machine:** A plain object or `switch` statement to manage transitions between **Normal**, **Sick**, and **Evolved**.
*   **Persistence:** **Browser LocalStorage** (optional) to keep the pet "alive" across page refreshes within the 7-day challenge.

## Development Tools
*   **Package Manager:** `npm` for dependency management.
*   **Internal Verification:** A custom "Debug Panel" (Day 5) to manipulate time and trigger evolution thresholds for QA.

## Deployment
*   **Static Hosting:** Optimized for deployment on platforms like Vercel or Netlify to demonstrate the functional loop.

## Dependencies (Latest Standards)
*   `vite`
*   `react` & `react-dom`
*   `tailwindcss` & `@tailwindcss/vite`
*   `class-variance-authority`, `clsx`, `tailwind-merge` (shadcn/ui core)
*   `lucide-react`
