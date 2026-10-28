import {
  ReactFlow,
  Background,
  Controls
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import CharacterNode from "./CharacterNode";

const nodeTypes = {
  character: CharacterNode,
};

export default function GameBoard({ nodes, conexoes, selecionarPersonagem }) {
  return (
    <section className="h-[550px] overflow-hidden rounded-xl border border-slate-700 bg-[#1c242d]">
      <ReactFlow
        nodes={nodes}
        edges={conexoes}
        nodeTypes={nodeTypes}
        nodesConnectable={false}
        onNodeClick={selecionarPersonagem}
        fitView
      >
        <Background color="#475569" gap={24} />
        <Controls />
      </ReactFlow>
    </section>
  );
}