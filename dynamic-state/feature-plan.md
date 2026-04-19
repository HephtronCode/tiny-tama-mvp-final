# Feature Plan: Dynamic States (The Identity Phase)

## Goal
The Dynamic States feature manages the pet's identity, visual representation, and behavioral rules. It acts as the "brain" that determines which version of the pet is displayed and how it reacts to environmental changes (vitals depletion) or user milestones (evolution).

## Interactions
*   **Vitals:** Listens for "zero-point" events to trigger the **Sick** state. Monitors stats to trigger the **Dreamer** Easter Egg.
*   **Care Loop:** Listens for the 10th care action to trigger the **Evolution** event.
*   **Persistence:** Stores the current state (Normal/Sick) and the life stage (Egg/Creature) in SQLite to ensure the pet doesn't "de-evolve" or "heal" magically on refresh.

## Concept
States provide the narrative progression of the MVP. By moving from an Egg to a Creature, the user feels a sense of achievement. By moving from Normal to Sick, the user feels a sense of responsibility.
