# Feature Plan: Care Loop (The Act Phase)

## Goal
The Care Loop feature provides the primary interactive elements for the user. It translates physical button clicks into state changes within the pet's **Vitals**, allowing the user to counteract the natural decay of Hunger, Happiness, and Energy.

## Interactions
*   **Vitals:** Each care action (Feed, Play, Rest) targets a specific vital, increasing its value by a fixed amount.
*   **Dynamic States:** The "Rest" action specifically serves as the recovery path for the **Sick** state.
*   **Evolution:** Every successful care action increment a global counter. At 10 actions, the pet transitions from **Egg** to **Creature**.
*   **UI/UX:** Buttons provide immediate visual feedback through animations and sound (if applicable), reinforcing the "Feedback" part of our core loop.

## Concept
The Care Loop is the "work" of the game. By clicking buttons, the user directly influences the pet's survival and growth. The 500ms animation lock ensures each action feels intentional and prevents accidental spamming.
