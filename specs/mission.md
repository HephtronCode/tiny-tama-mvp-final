# Mission: Tiny Tamagotchi MVP

## Mission
To create a cozy, low-stress digital companion that provides a gentle "Observe, Assess, Act" loop for users. The goal is to deliver a highly visual and intuitive web application that allows users to nurture an entity from an egg to a creature through consistent, simple care actions.

## Audience
*   **Primary:** Children and young adults who value high visual feedback and intuitive, friction-free interfaces.
*   **Persona Focus:** Users looking for a "digital desk pet" experience that doesn't demand high-stakes management or penalize them with permanent loss.

## Constraints
*   **Scope:** 1 User, 1 Pet.
*   **Stats:** Three core meters ranging from **0 to 100**:
    *   **Hunger:** Increases via "Feed".
    *   **Happiness:** Increases via "Play".
    *   **Energy:** Increases via "Rest".
*   **Actions:** Strictly limited to **Feed**, **Play**, and **Rest**.
*   **States:**
    *   **Normal:** The standard healthy state.
    *   **Sick:** Triggered automatically if any stat (Hunger, Happiness, or Energy) reaches 0.
    *   **Evolved:** A permanent visual upgrade from Egg to Creature.
*   **Evolution Path:** Egg -> Creature.
*   **Recovery Path:** The "Rest" action is the exclusive path to transition from "Sick" back to "Normal".
*   **Technical Exclusions:** No Databases (local state only), No Authentication, No Minigames, No Permanent Death.

## User Flows (Observe, Assess, Act, Feedback)
1.  **Observe:** User opens the app to see the visual state of the pet (Egg/Creature, Normal/Sick) and monitors the three stat meters as they tick down in real-time.
2.  **Assess:** User identifies the lowest stat or checks if the pet has entered the "Sick" state.
3.  **Act:** User selects the appropriate button:
    *   **Feed** to address Hunger.
    *   **Play** to address Happiness.
    *   **Rest** to address Energy or to cure Sickness.
4.  **Feedback:** The UI provides immediate visual confirmation:
    *   Stat meters increase instantly.
    *   If "Rest" was used on a "Sick" pet, the visual state returns to "Normal".
    *   If the 10th care action is reached, the pet evolves.
5.  **Idle:** The user exits or watches the pet, knowing stats will continue to deplete slowly.

## Success Criteria
*   **Engagement Milestone:** The user successfully triggers the **Egg -> Creature** evolution by performing 10 care actions.
*   **Care Milestone:** The user maintains the evolved Creature in a "Normal" state for a **continuous 5-minute session** without any stat hitting 0.
*   **Technical Integrity:** The state engine handles stat degradation, state transitions (Normal -> Sick -> Normal), and evolution without requiring a page refresh.

## Edge Cases
*   **Simultaneous Stat Depletion:** If multiple stats hit 0 at the same time, the pet enters the "Sick" state immediately. Logic: `if (Hunger == 0 || Happiness == 0 || Energy == 0) -> Sick`.
*   **Invalid Actions (Sick State):** To prevent frustration, "Feed" and "Play" buttons are explicitly disabled or ignored while the pet is "Sick". The user is funneled toward the "Rest" recovery path.
*   **Evolution Interruptions:** Evolution can only trigger while the pet is in the "Normal" state. If the 10th action occurs while the pet is "Sick", the evolution is queued or delayed until the pet returns to "Normal".
