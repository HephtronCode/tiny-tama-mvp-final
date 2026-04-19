# Validation: Vitals Smoke Tests

## Test 1: Staggered Decay Verification
1.  **Action:** Open the app and observe the three stat meters.
2.  **Observe:** Verify that the **Hunger** bar moves faster than **Happiness**, and **Happiness** moves faster than **Energy**.
3.  **Success:** Hunger should decrement approximately 3 times for every 1 Energy decrement.

## Test 2: Boundary Enforcement (Lower Limit)
1.  **Action:** Allow the **Energy** meter to reach 0.
2.  **Observe:** Verify the value stops at 0 and does not become negative.
3.  **Success:** Value is 0; state transition to "Sick" occurs.

## Test 3: Easter Egg Trigger (The Jitter)
1.  **Action:** Watch the **Hunger** bar as it approaches 10.
2.  **Observe:** Verify the pet starts jittering/shaking when Hunger hits 9.
3.  **Action:** Click **Feed**.
4.  **Observe:** Verify the jittering stops immediately once Hunger is 10 or higher.
5.  **Success:** Visual feedback confirms the threshold trigger works correctly.

## Test 4: SQLite Persistence
1.  **Action:** Open the app and wait for stats to decay.
2.  **Action:** Refresh the page.
3.  **Observe:** Verify the stats resume from their last saved values (max 10s loss) rather than resetting to 50/50/50.
4.  **Success:** Initial values are bypassed; saved state is loaded.
