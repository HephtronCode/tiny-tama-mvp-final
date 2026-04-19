# Requirements: Vitals Logic & Thresholds

## Core Vitals (0-100)
*   **Hunger:** 
    *   Initial Value: **50**
    *   Decay Rate: **-1 point every 3,000ms (3 seconds)**
*   **Happiness:** 
    *   Initial Value: **50**
    *   Decay Rate: **-1 point every 7,000ms (7 seconds)**
*   **Energy:** 
    *   Initial Value: **50**
    *   Decay Rate: **-1 point every 10,000ms (10 seconds)**

## Thresholds & Triggers
*   **State Trigger (Sick):** `if (Hunger == 0 || Happiness == 0 || Energy == 0)` -> Transition to **Sick**.
*   **Boundary Enforcement:** Stats are hard-capped at a minimum of **0** and a maximum of **100**.

## Easter Egg: "The Hangry Jitter"
*   **Trigger:** If `Hunger < 10` AND `Hunger > 0`.
*   **Visual Reaction:** The pet's sprite/placeholder performs a rapid "shake" or "jitter" animation (CSS transform/animation) to signal urgent distress before sickness occurs.

## Data Persistence (SQLite)
*   **Action Save:** Immediate save to SQLite whenever any Care Action (Feed, Play, Rest) is successfully processed.
*   **Periodic Save:** Automatic save every **10,000ms (10 seconds)** to capture natural decay progress.
