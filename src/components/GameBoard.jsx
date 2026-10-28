import {
  ReactFlow,
  Background,
  Controls
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import CharacterNode from "./CharacterNode";

import ChakraEdge from "./ChakraEdge";

const nodeTypes = {
  character: CharacterNode,
};

const edgeTypes = {
  chakra: ChakraEdge,
};

export default function GameBoard({ nodes, conexoes, selecionarPersonagem, selecionarConexao }) {
  return (
    <section className="h-[550px] overflow-hidden rounded-xl border border-slate-700 bg-[#1c242d]">
      <ReactFlow
        nodes={nodes}
        edges={conexoes}
        nodeTypes={nodeTypes}
        nodesConnectable={false}
        onNodeClick={selecionarPersonagem}
        onEdgeClick={selecionarConexao}
        edgeTypes={edgeTypes}
        fitView
      >
        <Background color="#475569" gap={24} />
        <Controls />
      </ReactFlow>
    </section>
  );
}