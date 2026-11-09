import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

test('remote skill documents a contract-first stop condition', async () => {
  const skill = await fs.readFile('skills/bpmn-remote-ai-development/SKILL.md', 'utf8');
  assert.match(skill, /OpenAPI document at runtime/);
  assert.match(skill, /Do not upload, rename, delete, or execute/);
  assert.match(skill, /\/admin\/api2/);
});

test('employee leave fixture and scenarios are present', async () => {
  const bpmn = await fs.readFile('benchmarks/reference/employee-leave-remote.bpmn', 'utf8');
  const feature = await fs.readFile('benchmarks/employee-leave-remote.feature', 'utf8');
  assert.match(bpmn, /Employee Leave Request/);
  assert.match(bpmn, /Task_ManagerApproval/);
  assert.match(feature, /Manager approves/);
  assert.match(feature, /Missing hosted contract/);
});
