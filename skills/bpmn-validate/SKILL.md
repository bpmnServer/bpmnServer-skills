---
name: bpmn-validate
description: Validate BPMN 2.0 XML with the existing bpmn-server parser and report structural, engine-compatibility, and diagram-layout issues without converting through JSON.
---

# bpmn-validate

Use this skill whenever a BPMN XML file is created, edited, or proposed for
bpmn-server.

## Workflow

1. Read the XML as XML and preserve it as the source of truth.
2. Parse it through the existing bpmn-server `bpmn-moddle`/Definition loader
   by running `scripts/validate-bpmn.mjs` with `BPMN_SERVER_ROOT` configured.
3. Check that every flow node is connected, every sequence flow has endpoints,
   every process has a start and reachable end, and every flow node has BPMN DI.
4. Report errors separately from warnings. Do not silently rewrite malformed
   XML or treat a successful parse as proof of runtime behavior.
5. For service tasks, user tasks, messages, timers, and boundary events, check
   the engine-specific requirements in `references/engine-constructs.md`.

The validator is intentionally deterministic and model-free. AI generation
quality must be evaluated separately against the benchmark prompts.
