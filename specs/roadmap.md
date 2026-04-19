# Roadmap: 7-Day Tiny Tamagotchi Sprint

## Phase 1: The Living Foundation
### Day 1: The Core Engine
*   **Project Setup:** Initialize React (TypeScript) environment and Vanilla CSS structure.
*   **State Engine:** Implement the 0-100 stat management for **Hunger**, **Happiness**, and **Energy**.
*   **The Pulse:** Create the automatic "tick-down" mechanism to deplete stats over time.
*   **Basic UI:** Build the three stat meters and the three core action buttons (Feed, Play, Rest).

### Day 2: State & Recovery
*   **Sick State Logic:** Implement the conditional check `if (any stat == 0) -> Sick`.
*   **Recovery Path:** Code the "Rest" action to transition the pet from **Sick** back to **Normal**.
*   **Visual Feedback:** Update the pet's placeholder graphic to reflect the **Normal** vs. **Sick** states.

### Day 3: Evolution Mechanics
*   **Care Counter:** Implement a persistent (session-based) counter for successful care actions.
*   **Evolution Trigger:** Code the logic for the **Egg -> Creature** transition at the 10-action threshold.
*   **Visual Evolution:** Create the visual shift from Egg to Creature assets.

## Phase 2: Polish & Precision
### Day 4: Visual Polish & Interaction Refinement
*   **Smooth Transitions:** Add CSS transitions for stat bar updates and state changes.
*   **Feedback Animations:** Implement "bouncing" or "scaling" animations for action button clicks.
*   **Cozy Fine-Tuning:** Balance the stat depletion rates and interaction loops to ensure a low-stress experience.

### Day 5: Internal Verification Tools
*   **Fast-Forward Mode:** Build a hidden/debug "Time Warp" tool to accelerate stat depletion for testing.
*   **Threshold Testing:** Create a "Dev Tool" to instantly trigger the 10-action evolution and the 5-minute healthy session requirement.

## Phase 3: Finalization & Launch
### Day 6: Edge Case Logic & Responsive Design
*   **Defensive UI:** Implement the rule to disable "Feed" and "Play" buttons while the pet is in the **Sick** state.
*   **Conflict Resolution:** Ensure simultaneous stat depletion (multiple stats hitting 0) is handled gracefully.
*   **Aesthetic Pass:** Finalize layout and typography; ensure full responsiveness across desktop and mobile screens.

### Day 7: Launch Readiness
*   **Final QA:** Rigorous manual testing against the **Success Criteria** (10-action evolution and 5-minute survival).
*   **Bug Squashing:** Identify and fix any logic gaps or UI glitches.
*   **Documentation:** Finalize the project README and ensure the code follows the 7-Day Challenge submission standards.
