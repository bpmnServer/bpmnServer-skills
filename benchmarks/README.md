# Text-to-BPMN benchmark

These seven prompts are English inputs for a future model evaluation. The
reference files are copied from the `AI-MDE/mdex` `bpmn-integration` checkout
and are used as behavioral/structural comparison material, not as claims that
an AI generated them correctly.

| ID | Prompt focus | Reference |
|---|---|---|
| insurance-claim | service task, XOR decision, user task, message wait | `reference/insurance-claim.bpmn` |
| leave-application | approval, rejection, reminder loop | `reference/leave-application.bpmn` |
| invoice-processing | event-based gateway, payment, cancellation, timer | `reference/invoice-processing.bpmn` |
| used-car-preparation | parallel work and synchronization | `reference/used-car-preparation.bpmn` |
| response-handling | competing messages, signals, timeout | `reference/response-handling.bpmn` |
| marketing-campaign | embedded subprocess and exception path | `reference/marketing-campaign.bpmn` |
| request-processing | interrupting and non-interrupting boundaries | `reference/request-processing.bpmn` |

Run `node scripts/validate-bpmn.mjs benchmarks/reference` to check all files.
