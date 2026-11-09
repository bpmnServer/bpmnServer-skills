# Remote BPMN development assessment

## Scope

This assessment is based on a read-only inspection of bpmnServer/bpmn-server branch testing at commit d2f6fc8e0e577b2a5881331ea2a038433d35e87e, plus a read-only inspection of https://bpmn.omniworkflow.com.

The BPMN Server repository and its branches were not modified.

## Source findings

The testing branch contains packages/bpmn-web/src/routes/api2.ts with runtime model listing, start, data queries, engine invoke/assign, message/signal operations, and separate administrative model import under /admin/api2. It also contains packages/bpmn-client/src/remote-import.ts for remote BPMN upload and a client exposing legacy /api and newer /api2 route families.

The source includes API-key middleware and a configured service account for API2 routes. Its OpenAPI support is for outbound REST connectors inside BPMN models; that is not proof that the hosted BPMN Server publishes an OpenAPI description for its own management API.

## Hosted workbench observations

On 2026-11-09, https://bpmn.omniworkflow.com rendered a model/task/instance UI and showed existing instances. The page exposed Models, Pending tasks, Instances, New model, Import, Open model, Run process, Export, Rename, Delete model, and Examine.

Not verified from the public surface:

- a retrievable /openapi.json or /swagger.json;
- an unauthenticated API base URL;
- an API key or task API key;
- permission to import a model;
- a stable public route for completing a user task;
- tenant isolation or safe test-data guarantees.

Therefore this skill supports remote-development orchestration, but does not claim that the public demo currently exposes a complete public OpenAPI contract.

## Capability matrix

| Lifecycle step | Source evidence | Hosted status |
|---|---|---|
| Generate BPMN XML | Existing skills and BPMN 2.0 conventions | Feasible locally |
| Parse/validate | Existing parser-backed validation | Feasible with a checkout |
| Import/update model | POST /admin/api2/model/import/:name | Requires admin auth; not live-tested |
| List models | GET /api2/model/list | Requires API auth; not live-tested |
| Start process | POST /api2/engine/start/:name | Requires API auth; not live-tested |
| Find pending tasks | POST /api2/data/findItems and /api2/tasks | Exact task contract not established |
| Complete user task | API2 invoke/assign and task API source | Exact public contract not established |
| Inspect instance/history | GET /api2/data/findInstances and data routes | Requires API auth; not live-tested |
| OpenAPI discovery | No public document verified | Gap |
| Per-user/tenant isolation | Configured service account visible in source | Must be confirmed |

## Required gap closure

A production-ready remote AI workflow should publish a versioned OpenAPI 3.x document; separate least-privilege credentials for administration, runtime, and task completion; schemas and examples for multipart import, start, task query/completion, and history; model/version identifiers and idempotency behavior; explicit tenant and user-principal semantics; a disposable sandbox; rate limits and audit/redaction guidance; and a documented validation-error response.

Until these are available, use the employee-leave example only with synthetic data and treat remote execution as operator-assisted.
