import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { validateFile } from '../scripts/validate-bpmn.mjs';

const dir = path.resolve('benchmarks/reference');
const files = (await fs.readdir(dir)).filter(f => f.endsWith('.bpmn'));

test('all seven benchmark reference files are present', () => assert.equal(files.length, 7));
for (const file of files) test(`parser accepts ${file}`, async () => {
  const result = await validateFile(path.join(dir, file));
  assert.deepEqual(result.errors, []);
});

test('benchmark metadata documents every reference', async () => {
  const prompts = await fs.readFile('benchmarks/prompts.md', 'utf8');
  for (const name of ['insurance', 'leave', 'invoice', 'used-car', 'response', 'marketing', 'request']) assert.match(prompts, new RegExp(name, 'i'));
});
