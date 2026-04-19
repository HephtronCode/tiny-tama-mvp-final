# Requirements: Dynamic State Logic & Thresholds

## Defined States
1.  **Normal:** The default healthy state for both Egg and Creature.
2.  **Sick:** Triggered by any vital reaching 0.
3.  **Evolved:** A permanent upgrade from the Egg life stage to the Creature life stage.

## State Transitions
*   **Normal -> Sick:** Triggered if `Hunger == 0 || Happiness == 0 || Energy == 0`.
*   **Sick -> Normal:** Triggered only by the **Rest** action.
*   **Egg -> Creature (Evolution):**
    *   **Threshold:** Exactly 10 successful care actions.
    *   **Constraint:** Evolution cannot occur while the pet is in the **Sick** state. If the 10th action is reached while Sick, the evolution triggers immediately upon returning to **Normal**.

## Visual Logic
*   **Sick State ("Dizzy Swirls"):** 
    *   Visual: "Dizzy" or "Cloud" emojis orbit the pet's head.
    *   Motion: The sprite performs a slow, side-to-side wobbling motion.
*   **Evolution ("The Hatch"):**
    *   Sequence: A 2-second "locked" animation where the Egg shakes, cracks appear, and then "pops" into the Creature with a confetti burst.

## Easter Egg: "The Dreamer"
*   **Trigger:** If the app remains idle (no clicks) for **> 60 seconds** AND all three vitals are **> 80**.
*   **Visual:** The pet enters a "Sleeping" pose with "Zzz" emojis appearing above it.
*   **Interrupt:** Any button click immediately returns the pet to its active **Normal** state.
