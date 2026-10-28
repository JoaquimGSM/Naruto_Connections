export default function Justificativa({
  justificativa,
  setJustificativa
}) {
  return (
    <textarea
      value={justificativa}
      onChange={(event) => setJustificativa(event.target.value)}
      placeholder="Explique a relação entre os personagens..."
      className="mt-4 block w-full max-w-md rounded-lg bg-slate-800 p-3 text-white"
    />
  );
}