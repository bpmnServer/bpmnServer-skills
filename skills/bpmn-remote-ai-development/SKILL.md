---
name: bpmn-remote-ai-development
description: Develop, publish, execute, and debug bpmn-server workflows through a hosted HTTP API using repository guidance and an OpenAPI contract when one is available.
---

# bpmn-remote-ai-development

Use this skill when a user wants to develop a bpmn-server workflow remotely, without installing the engine locally.

## Safety and scope

- Treat BPMN XML as the source of truth. Do not invent a JSON process model.
- Read the remote API OpenAPI document at runtime if the deployment publishes one; prefer its paths, schemas, authentication, and server URL over examples in this skill.
- Do not upload, rename, delete, or execute a model until the user has supplied an authorized API key and named the target deployment.
- Never assume that a public demo is isolated, writable, or safe for business data. Use synthetic employee data only.
- Keep administrative model changes separate from runtime operations. Import is an administrative operation in bpmn-server 3.x.

## Workflow

1. Inspect repository guidance and choose supported BPMN constructs.
2. Produce BPMN 2.0 XML with stable IDs, complete incoming/outgoing references, and BPMN DI.
3. Validate the XML locally with bpmn-validate when a bpmn-server checkout is available.
4. Discover the hosted API contract. Record the base URL, authentication header, model import route, start route, task query route, task completion route, and instance-history route. Stop if any required operation is absent or undocumented.
5. Import or update the model using the deployment's documented multipart request. Confirm the response and list the model before starting it.
6. Start a synthetic test instance with explicit input data. Capture the returned instance identifier.
7. Query pending user tasks, complete the approval task with the documented invoke or assign operation, and query the instance again.
8. Record request method/path, sanitized response, model name, instance ID, and any server error. Do not log API keys or personal data.
9. Return the BPMN XML, test evidence, and a limitations list. Never claim an end-to-end run when only parsing or UI inspection was possible.

## Known bpmn-server 3.x route family

These are source-derived fallbacks, not a substitute for the hosted OpenAPI contract:

- Runtime read/start routes are mounted under /api2, including GET /model/list, POST /engine/start/:name, POST /data/findItems, and GET /data/findInstances.
- Runtime task operations are under /api2/tasks and use a separate task API key.
- Administration routes are mounted under /admin/api2, including multipart POST /model/import/:name.
- Older deployments may expose /api and /admin/api instead. Confirm the route family from the target server.
- The testing branch source shows API-key middleware and a configured service account; client-supplied user/group claims are not an authorization substitute.

## Output contract

Return the generated BPMN file; the exact API contract and deployment used; validation output; sanitized import/start/task/history evidence; and assumptions, unverified operations, and required server-side changes.
