import { Handle, Position } from "@xyflow/react";

export default function CharacterNode({ data }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <Handle type="target" position={Position.Left} />

      <div
        className="flex h-18 w-18 items-center justify-center rounded-full border-4 border-white/20 text-2xl font-bold text-white"
        style={{ backgroundColor: data.color }}
      >
        {data.initial}
      </div>

      <span className="whitespace-nowrap rounded-md bg-slate-900 px-3 py-1 text-xs font-semibold">
        {data.name}
      </span>

      <Handle type="source" position={Position.Right} />
    </div>
  );
}