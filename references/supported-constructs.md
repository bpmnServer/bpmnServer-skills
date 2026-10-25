# Supported BPMN constructs

The bpmn-server source in `AI-MDE/mdex/vendor/bpmn-server` is the compatibility
authority for this milestone. The parser recognizes BPMN 2.0 definitions,
processes, tasks, gateways, sequence flows, events, message flows, lanes,
subprocesses, transactions, compensation, and boundary events.

Prefer these constructs in generated files:

* none, message, timer, signal, error, escalation, cancel, compensation, and
  terminate events where the process semantics require them;
* service, user, script, manual, send, receive, business-rule, call, and
  sub-process activities when the corresponding runtime behavior exists;
* exclusive, parallel, inclusive, and event-based gateways;
* sequence flows and message flows with explicit endpoints;
* interrupting and non-interrupting boundary events.

Unsupported or application-specific behavior must be called out rather than
invented. BPMN DI is required for useful layout and is validated separately.
