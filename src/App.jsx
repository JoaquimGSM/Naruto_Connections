import { useMemo, useState } from "react";

import GameBoard from "./components/GameBoard";

import CharacterNode from "./components/CharacterNode";
import { characters } from "./data/characters";



export default function App() {

  const [personagensSelecionados, setPersonagensSelecionados] = useState([]);

  const [conexoes, setConexoes] = useState([]);

  function selecionarPersonagem(event, node) {
    setPersonagensSelecionados((anteriores) => {

      const existe = anteriores.some(
        (personagem) => personagem.id === node.data.id
      );

      if (existe) {
      return anteriores.filter(
        (personagem) => personagem.id !== node.data.id
        );
      }

      if (anteriores.length >= 2) {
        return anteriores;
      }

      return [...anteriores, node.data];
    });
  }


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
          data: {
            ...personagem,
            selecionado: personagensSelecionados.some(
              (selecionado) => selecionado.id === personagem.id
            ),
          },
        })),
    [personagensSelecionados]
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

          <GameBoard
            nodes={nodes}
            conexoes={conexoes}
            selecionarPersonagem={selecionarPersonagem}
          />
        <p className="mt-4 text-orange-400">
          Selecionados:{" "}
          {personagensSelecionados.map((personagem) => personagem.name).join(", ") || "Nenhum"}
        </p>
      </div>
    </main>
  );
}