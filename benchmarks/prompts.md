# English benchmark prompts

1. **Insurance claim:** When a property insurance claim is received, verify
   whether the policy covers it. Reject and end uncovered claims. For covered
   claims, assign a claims assessor, wait for payment confirmation, mark the
   claim settled, and finish.
2. **Leave application:** Receive a leave request, ask a manager to approve or
   reject it, notify the employee, and allow the employee to correct and resubmit
   a rejected request. Send a reminder when approval takes too long.
3. **Invoice processing:** Receive an invoice, validate it, and wait for the
   first of payment confirmation, cancellation, or a payment timeout. Complete,
   cancel, or escalate according to the event received.
4. **Used-car preparation:** After a used car is purchased, clean it, inspect
   it, and prepare its paperwork in parallel. Do not release the car until all
   parallel work has completed.
5. **Response handling:** Send a request and wait for the first response from a
   message, signal, or timeout. Process the response that wins and close the
   process without executing losing branches.
6. **Marketing campaign:** Start a campaign containing an embedded preparation
   subprocess. If a campaign-specific exception occurs, handle it and complete
   the campaign with a recorded outcome.
7. **Request processing:** Receive a request and process it. A cancellation
   boundary must interrupt the work, while a reminder boundary may run without
   interrupting it. Finish with the appropriate outcome.
