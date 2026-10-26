import { useMemo } from "react";

import { 
  ReactFlow,
  Background,
  Controls
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import CharacterNode from "./components/CharacterNode";
import { characters } from "./data/characters";

const nodeTypes = {
  character: CharacterNode,
};

export default function App() {
  const nodes = useMemo(
    () =>
      characters
        .filter((personagem) =>
          ["jiraiya", "itachi", "kabuto"].includes(personagem.id)
        )
        .map((personagem, index) => ({
          id: personagem.id,
          type: "character",
          position: {
            x: index * 250,
            y: 150,
          },
          data: personagem,
        })),
    []
  );

  return (
    <main className="min-h-screen bg-[#11151b] p-8 text-white">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-400">
            Desafio diário #001
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            Naruto Connections
          </h1>

          <p className="mt-3 text-slate-400">
            Encontre relações entre os personagens
            e conecte todos eles.
          </p>
        </header>

        <section className="h-[550px] overflow-hidden rounded-xl border border-slate-700 bg-[#1c242d]">
          <ReactFlow
            nodes={nodes}
            edges={[]}
            nodeTypes={nodeTypes}
            nodesConnectable={false}
            fitView
          >
            <Background color="#475569" gap={24} />
            <Controls />
          </ReactFlow>
        </section>
      </div>
    </main>
  );
}