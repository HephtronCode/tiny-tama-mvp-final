# Requirements: Care Loop Logic & Thresholds

## Care Actions (+10 Boost)
*   **Feed:** Increases **Hunger** by **10 points**.
*   **Play:** Increases **Happiness** by **10 points**.
*   **Rest:** Increases **Energy** by **10 points**. 
    *   *Note:* If the pet is in the **Sick** state, "Rest" triggers the recovery to **Normal** only once **Energy reaches 50%**.

## Interaction Constraints
*   **Animation Lock (Cooldown):** After any care action button is clicked, all three action buttons are disabled for **500ms**. 
*   **Boundary Cap:** Care actions cannot increase a vital beyond its maximum value of **100**.
*   **Sick State Restriction:** While the pet is in the **Sick** state, the **Feed** and **Play** buttons are explicitly disabled. Only **Rest** is functional.

## Easter Egg: "The Heart Shower"
*   **Trigger Condition:** The user must perform all three unique actions (**Feed**, **Play**, and **Rest**) in any order within a rolling **5,000ms (5 second)** window.
*   **Visual Reaction:** A brief burst of heart particles or emojis appears over the pet's head to celebrate the comprehensive care.

## Evolution Integration
*   **Counter:** A hidden `actionCount` variable increments by **1** for every valid care action performed.
*   **Threshold:** When `actionCount == 10`, the system signals the **Dynamic States** manager to trigger the **Evolution** (Egg -> Creature).
