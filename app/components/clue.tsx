import type { ClueState } from "~/state/puzzleState";

export function Clue({
  number,
  text,
  isSelected,
  isHighlighted,
}: ClueState & { isSelected: boolean; isHighlighted: boolean }) {
  return (
    <div>
      <span>{number}</span>
      <span>{text}</span>
    </div>
  );
}
