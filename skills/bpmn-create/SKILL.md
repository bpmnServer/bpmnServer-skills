---
name: bpmn-create
description: Create executable BPMN 2.0 XML for bpmn-server from a natural-language process description, preserving engine-compatible constructs and diagram layout.
---

# bpmn-create

Use this skill when a user wants a BPMN process created or edited for
bpmn-server. Produce a `.bpmn` file directly. Do not create an intermediate
JSON process model.

## Workflow

1. Extract participants, start conditions, activities, decisions, waits,
   messages, timers, completion paths, and failure paths from the description.
2. Select only constructs supported by bpmn-server; consult
   `references/supported-constructs.md` and `references/engine-constructs.md`.
3. Write BPMN 2.0 XML with stable descriptive IDs, incoming/outgoing flow
   references, and BPMN DI shapes/edges.
4. Keep service-task behavior explicit with a `type`/worker mapping and keep
   user-task assignment/form metadata in engine extensions when required.
5. Run `bpmn-validate` against the exact XML before presenting it.

## Output contract

Return the XML file, a concise assumptions list, and any construct that needs
an application worker or external message publisher. Do not claim behavioral
equivalence to a reference model without executing a test path.
