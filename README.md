# BPMN Server Agent Skills

Open-source Agent Skills for creating and validating BPMN 2.0 XML for
[bpmn-server](https://github.com/bpmnServer/bpmn-server). The first milestone
contains `bpmn-create` and `bpmn-validate`.

The skills deliberately use BPMN 2.0 XML as the interchange format. They do
not introduce a JSON model or a second BPMN abstraction. Validation delegates
to the existing BPMN Server parser when `BPMN_SERVER_ROOT` points at a built
bpmn-server checkout.

## Layout

* `skills/bpmn-create/SKILL.md` — authoring workflow and XML rules.
* `skills/bpmn-validate/SKILL.md` — validation workflow and diagnostics.
* `references/` — supported constructs, engine-specific behavior, and examples.
* `benchmarks/` — seven English prompts, reference files, and expected behavior.
* `scripts/` — deterministic parser-backed validation and benchmark checks.

## Validate

From a checkout containing the built BPMN Server package:

```text
set BPMN_SERVER_ROOT=..\mdex\vendor\bpmn-server
npm install
npm test
```

The scripts build the referenced server package if needed, parse every reference
model with its moddle/parser path, and run structural benchmark assertions.

## Status

This milestone tests parser-backed structural compatibility and benchmark
fixture integrity. It does not claim that an AI model generated the benchmark
models correctly; no model-generation run is included.

Licensed under Apache-2.0.
