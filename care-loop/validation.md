# Validation: Care Loop Smoke Tests

## Test 1: Boost & Boundary Check
1.  **Action:** Click the **Feed** button once.
2.  **Observe:** Verify **Hunger** increases by exactly 10 points.
3.  **Action:** Continue clicking **Feed** until Hunger reaches 100.
4.  **Action:** Click **Feed** one more time.
5.  **Observe:** Verify Hunger remains at 100 and does not exceed it.
6.  **Success:** Linear boost and upper boundary are enforced.

## Test 2: Animation Lock (Cooldown)
1.  **Action:** Click the **Play** button and immediately attempt to click **Feed**.
2.  **Observe:** Verify the UI buttons appear "disabled" or do not respond for the first 500ms.
3.  **Success:** Rapid spamming is prevented; actions are processed as discrete events.

## Test 3: Easter Egg Trigger (Heart Shower)
1.  **Action:** Click **Feed**, then **Play**, then **Rest** in rapid succession (within 5 seconds).
2.  **Observe:** Verify the heart particle animation triggers.
3.  **Action:** Wait 10 seconds. Click **Feed** and **Play**, but wait 6 seconds before clicking **Rest**.
4.  **Observe:** Verify the heart particle animation **does not** trigger.
5.  **Success:** Timing-based logic correctly identifies the "comprehensive care" pattern.

## Test 4: Sick State Funneling
1.  **Action:** Allow any vital to hit 0 to trigger the **Sick** state.
2.  **Observe:** Verify the **Feed** and **Play** buttons are greyed out or unclickable.
3.  **Action:** Click **Rest**.
4.  **Observe:** Verify the pet returns to the **Normal** state and the buttons re-enable.
5.  **Success:** Only the recovery path is available during distress.
