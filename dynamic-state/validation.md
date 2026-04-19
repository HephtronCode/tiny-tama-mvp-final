# Validation: Dynamic State Smoke Tests

## Test 1: Sick State Behavioral Cues
1.  **Action:** Allow any vital to hit 0.
2.  **Observe:** Verify the pet starts wobbling and the "Dizzy" emojis appear.
3.  **Action:** Click **Rest**.
4.  **Observe:** Verify the wobbling stops and emojis vanish instantly.
5.  **Success:** State-based visual feedback is accurate.

## Test 2: Evolution "Hatch" Sequence
1.  **Action:** Perform exactly 9 care actions.
2.  **Action:** Perform the 10th care action.
3.  **Observe:** Verify the 2-second shaking/cracking animation plays before the Creature appears.
4.  **Observe:** Verify confetti triggers at the moment of the "pop."
5.  **Success:** The milestone feels rewarding and the transition is clear.

## Test 3: Evolution Block (Sick State)
1.  **Action:** Perform 9 care actions.
2.  **Action:** Allow a vital to hit 0 (Sick State).
3.  **Action:** Perform the 10th action (Rest) to heal the pet.
4.  **Observe:** Verify the evolution animation triggers *after* the pet returns to Normal.
5.  **Success:** Evolution logic respects the "Must be healthy" constraint.

## Test 4: The Dreamer (Idle State)
1.  **Action:** Use care actions to get all stats above 81.
2.  **Action:** Do not touch the mouse/keyboard for 65 seconds.
3.  **Observe:** Verify the "Zzz" emojis appear and the pet enters a sleeping pose.
4.  **Action:** Click any button.
5.  **Observe:** Verify the pet "wakes up" immediately.
6.  **Success:** Idle behavior adds "life" to the pet without breaking the core loop.
