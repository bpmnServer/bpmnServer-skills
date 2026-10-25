# BPMN DI layout requirements

Every process flow node should have a matching `bpmndi:BPMNShape`; every
sequence flow should have a matching `bpmndi:BPMNEdge` with at least two
waypoints. Keep shapes non-overlapping, leave readable spacing between
activities and gateways, and include labels for user-visible names. Layout is
part of the source XML and is not reconstructed through a JSON intermediary.
