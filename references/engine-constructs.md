# bpmn-server engine-specific constructs

This guide records the contract used by the skills; verify details against the
target checkout before deployment.

* **Service tasks:** provide a worker/handler mapping for the task type. The
  XML is valid without a running worker, but execution will wait or fail until
  the application registers the matching service behavior.
* **User tasks:** provide assignment and completion semantics appropriate to the
  application. A user task is a wait state; it is not an automatic approval.
* **Messages:** use stable message names/IDs and document the publisher and
  correlation data. A message catch can remain waiting indefinitely.
* **Timers:** document whether the timer is a duration, date, or cycle and the
  clock assumptions used by tests.
* **Boundary events:** identify the attached activity and whether interruption
  is intended. Non-interrupting boundaries create a concurrent path.
* **Gateways:** exclusive decisions need explicit conditions/default behavior;
  parallel forks need a compatible join; event-based gateways require competing
  event catches.
* **Subprocesses:** keep child start/end paths complete and document whether an
  event subprocess is interrupting.

Parser success is only a structural gate. Worker availability, FEEL behavior,
message correlation, timers, and real execution paths require runtime tests.
