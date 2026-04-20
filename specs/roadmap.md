# Roadmap: 7-Day Tiny Tamagotchi Sprint

## Phase 1: The Living Foundation (COMPLETED)
### Day 1: The Core Engine
*   **Project Setup:** Initialize React environment and Vanilla CSS structure.
*   **State Engine:** Implement the 0-100 stat management for **Hunger**, **Happiness**, and **Energy**.
*   **The Pulse:** Create the automatic "tick-down" mechanism to deplete stats over time.
*   **Basic UI:** Build the three stat meters and the three core action buttons (Feed, Play, Rest).

### Day 2: State & Recovery
*   **Sick State Logic:** Implement the conditional check `if (any stat == 0) -> Sick`.
*   **Recovery Path:** Code the "Rest" action to transition the pet from **Sick** back to **Normal**.
*   **Visual Feedback:** Update the pet's placeholder graphic to reflect states.

### Day 3: Evolution & Arrival
*   **Care Counter:** Implement a persistent (SQLite) counter for successful care actions.
*   **Evolution Trigger:** Code the logic for the **Box -> Puppy** transition at the 10-action threshold.
*   **Naming Mechanic:** Add a naming dialog that appears upon puppy arrival.

## Phase 2: Polish & Precision (COMPLETED)
### Day 4: Visual Polish & Framer Motion
*   **Smooth Transitions:** Replace CSS animations with **Framer Motion** for physics-based movement.
*   **Feedback Animations:** Implement "bouncing" and "spring" reactions for actions and touch.
*   **Cozy Fine-Tuning:** Balance the stat depletion rates and interaction loops.

### Day 5: Internal Verification Tools
*   **Fast-Forward Mode:** Build a hidden "Time Warp" tool to accelerate stat depletion for testing.
*   **Threshold Testing:** Create a "Dev Tool" to instantly trigger the 10-action evolution and naming flow.

## Phase 3: Finalization & Launch (IN PROGRESS)
### Day 6: Edge Case Logic & Responsive Design
*   **Defensive UI:** Implement the rule to disable "Feed" and "Play" buttons while the pet is in the **Sick** state.
*   **Touch Interaction:** Finalize the click-to-jump behavior and happiness boost.
*   **Aesthetic Pass:** Finalize layout and typography; ensure full responsiveness.
