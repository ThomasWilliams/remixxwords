import type { CellState } from "~/state/puzzleState";

export function Cell({
  number,
  isBlock,
  userFill,
  isSelected,
  isHighlighted,
}: CellState & { isSelected: boolean; isHighlighted: boolean }) {
  const bgClass = isBlock
    ? "bg-black"
    : isSelected
    ? "bg-yellow-300"
    : isHighlighted
    ? "bg-stone-300"
    : "bg-white";
  console.log(bgClass);
  return (
    <div className={`${bgClass} w-12 h-12 relative`}>
      {number && <div className="absolute top-0 left-1 text-xs">{number}</div>}
      {userFill && (
        <div className="capitalize text-4xl text-center leading-normal">
          {userFill}
        </div>
      )}
    </div>
  );
}
