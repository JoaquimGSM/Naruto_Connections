import { useMemo, useState } from "react";

import GameBoard from "./components/GameBoard";

import { characters } from "./data/characters";
import Justificativa from "./components/Justificativa";
import EditarJustificativa from "./components/EditarJustificativa";

export default function App() {

  const [personagensSelecionados, setPersonagensSelecionados] = useState([]);

  const [conexoes, setConexoes] = useState([]);

  const [justificativa, setJustificativa] = useState("");

  const [conexaoSelecionada, setConexaoSelecionada] = useState(null);

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

  function criarConexao() {
    if (personagensSelecionados.length !== 2) {
      return;
    }

    if (justificativa.trim() === "") {
      return;
    }

    const [primeiro, segundo] = personagensSelecionados;

    const existeConexao = conexoes.some((conexao) => {
      return (
        (conexao.source === primeiro.id && conexao.target === segundo.id) ||
        (conexao.source === segundo.id && conexao.target === primeiro.id)
      );
    });

    if (existeConexao) {
      return;
    }

    const novaConexao = {
      id: `${primeiro.id}-${segundo.id}`,
      source: primeiro.id,
      target: segundo.id,
      data: {
        justificativa: justificativa.trim(),
      },
      type: "chakra",
    };

    setConexoes((anteriores) => [
      ...anteriores,
      novaConexao,
    ]);
    setJustificativa("");
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

  function selecionarConexao(event, edge) {
    setConexaoSelecionada(edge);
  }


  function salvarJustificativa(id, novoTexto) {
    setConexoes((anteriores) =>
      anteriores.map((conexao) => {
        if (conexao.id === id) {
          return {
            ...conexao,
            data: {
              ...conexao.data,
              justificativa: novoTexto.trim(),
            },
          };
        }

        return conexao;
      })
    );
  }

  const conexaoAtual = conexoes.find(
    (conexao) => conexao.id === conexaoSelecionada?.id
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
          selecionarConexao={selecionarConexao}
        />
        {conexaoAtual && (
          <EditarJustificativa
            key={conexaoAtual.id}
            conexao={conexaoAtual}
            salvarJustificativa={salvarJustificativa}
          />
        )}
        <p className="mt-4 text-orange-400">
          Selecionados:{" "}
          {personagensSelecionados.map((personagem) => personagem.name).join(", ") || "Nenhum"}
        </p>
        <button
          onClick={criarConexao}
          disabled={personagensSelecionados.length !== 2}
          className="mt-4 rounded-lg bg-orange-500 px-5 py-3 font-semibold text-black disabled:cursor-not-allowed disabled:opacity-40"
        >
          Criar conexão
        </button>
        <Justificativa
          justificativa={justificativa}
          setJustificativa={setJustificativa}
        />
      </div>
    </main>
  );
}