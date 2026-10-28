import { BaseEdge, getBezierPath } from "@xyflow/react";

export default function ChakraEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
}) {
  const [caminho] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  return (
    <>
      <BaseEdge
        id={id}
        path={caminho}
        className="chakra-base"
      />

      <path
        d={caminho}
        className="chakra-energia"
        fill="none"
        pointerEvents="none"
      />
    </>
  );
}