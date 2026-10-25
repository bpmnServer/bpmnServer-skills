import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.env.BPMN_SERVER_ROOT;
if (!root) throw new Error('BPMN_SERVER_ROOT must point to a bpmn-server checkout');
let BpmnModdle;
for (const candidate of [path.join(path.resolve(root), 'node_modules/bpmn-moddle/dist/index.js'), path.join(path.resolve(root), '..', '..', 'node_modules/bpmn-moddle/dist/index.js')]) {
  try { ({ BpmnModdle } = await import(pathToFileURL(candidate))); break; } catch { /* try the monorepo hoist */ }
}
if (!BpmnModdle) throw new Error(`bpmn-moddle dependency not found below ${root}`);

async function files(target) {
  const stat = await fs.stat(target);
  if (stat.isFile()) return [target];
  return (await fs.readdir(target, { withFileTypes: true })).flatMap(e =>
    e.isDirectory() ? [] : e.name.endsWith('.bpmn') ? [path.join(target, e.name)] : []);
}

export async function validateFile(file) {
  const xml = await fs.readFile(file, 'utf8');
  const moddle = new BpmnModdle();
  const { rootElement } = await moddle.fromXML(xml);
  const errors = [], warnings = [];
  const processes = rootElement.rootElements.filter(e => e.$type === 'bpmn:Process');
  if (!processes.length) errors.push('no bpmn:Process found');
  const shapes = new Set((rootElement.diagrams ?? []).flatMap(d => d.plane?.planeElement ?? []).map(x => x.bpmnElement?.id));
  for (const process of processes) {
    const nodes = process.flowElements ?? [];
    const ids = new Set(nodes.map(n => n.id));
    for (const node of nodes) {
      if (node.$type === 'bpmn:SequenceFlow') {
        if (!node.sourceRef || !node.targetRef || !ids.has(node.sourceRef.id) || !ids.has(node.targetRef.id)) errors.push(`${node.id}: sequence flow endpoint missing`);
      } else if (!shapes.has(node.id)) warnings.push(`${node.id}: missing BPMN DI shape`);
    }
    const starts = nodes.filter(n => /^bpmn:.*StartEvent$/.test(n.$type) && !(n.incoming?.length));
    const ends = nodes.filter(n => /^bpmn:.*EndEvent$/.test(n.$type) && !(n.outgoing?.length));
    if (!starts.length) errors.push(`${process.id}: no start event`);
    if (!ends.length) errors.push(`${process.id}: no end event`);
  }
  return { file, errors, warnings, rootElement };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const target = process.argv[2];
  if (!target) throw new Error('usage: node scripts/validate-bpmn.mjs <file-or-directory>');
  let failed = false;
  for (const file of await files(target)) {
    try { const result = await validateFile(file); console.log(`${file}: ${result.errors.length} errors, ${result.warnings.length} warnings`); if (result.errors.length) failed = true; }
    catch (error) { failed = true; console.error(`${file}: ${error.message}`); }
  }
  process.exitCode = failed ? 1 : 0;
}
