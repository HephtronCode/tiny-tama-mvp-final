# Feature Plan: Vitals (The Living Foundation)

## Goal
The goal of the Vitals feature is to manage the core "life force" of the pet. It provides the numerical representation of the pet's needs and serves as the primary driver for the "Observe, Assess, Act" loop. 

## Interactions
*   **Care Loop:** Vitals receive positive increments from the Care Loop actions (**Feed** -> +Hunger, **Play** -> +Happiness, **Rest** -> +Energy).
*   **Dynamic States:** Vitals are the sole triggers for the **Sick** state. If any vital hits 0, the state manager transitions the pet to **Sick**.
*   **Persistence:** Vitals are periodically synced to the local SQLite database to ensure the pet's condition persists across sessions.

## Concept
The vitals act as a "ticking clock." Without user intervention, the pet's condition naturally declines. This creates the "need" for the user to return and engage with the application.
