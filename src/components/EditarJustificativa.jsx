import { useState } from "react";

export default function EditarJustificativa({ conexao }) {

    const [editando, setEditando] = useState(false);

    const [novoTexto, setNovoTexto] = useState(
        conexao.data?.justificativa ?? ""
    );

    return (
        <div className="mt-4 rounded-lg bg-slate-800 p-4">

            <p className="text-green-400">
                Justificativa: {conexao.data?.justificativa}
            </p>

            <button
                onClick={() => setEditando(!editando)}
                className="mt-3 rounded-lg bg-orange-500 px-4 py-2 text-black"
            >
                {editando ? "Cancelar edição" : "Editar justificativa"}
            </button>

            {editando && (
                <textarea
                    value={novoTexto}
                    onChange={(event) => setNovoTexto(event.target.value)}
                    className="mt-4 block w-full rounded-lg bg-slate-700 p-3 text-white"
                />
            )}

        </div>
    );
}