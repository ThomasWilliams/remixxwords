import { ClueDirection } from "@prisma/client";
import { Cell } from "./cell";
import type { CellState, PuzzleState } from "~/state/puzzleState";

export function Grid({ cells, width, height, cursor, direction }: PuzzleState) {
  const gridTemplateClasses = `grid-cols-${width} grid-rows-${height}`;
  return (
    <div
      className={`puzzle-grid grid ${gridTemplateClasses} bg-black gap-1 border-4 border-black m-3`}
    >
      {cells.map((row, i) =>
        row.map((cell, j) => (
          <Cell
            {...cell}
            isSelected={isSelected({ row: i, col: j, cursor })}
            isHighlighted={isHighlighted({
              row: i,
              col: j,
              cursor,
              cells,
              direction,
            })}
            key={`${i},${j}`}
          />
        ))
      )}
    </div>
  );
}

function isSelected({
  row,
  col,
  cursor,
}: {
  row: number;
  col: number;
  cursor: [number, number];
}): boolean {
  return row === cursor[1] && col === cursor[0];
}

function isHighlighted({
  row,
  col,
  cursor,
  direction,
  cells,
}: {
  row: number;
  col: number;
  cursor: [number, number];
  direction: ClueDirection;
  cells: CellState[][];
}): boolean {
  if (direction === ClueDirection.ACROSS && row === cursor[1]) {
    const minCol = Math.min(col, cursor[0]);
    const maxCol = Math.max(col, cursor[0]);
    const row = cursor[1];
    for (let col = minCol + 1; col < maxCol; col++) {
      if (cells[row]?.[col]?.isBlock) {
        return false;
      }
    }
    return true;
  }

  if (direction === ClueDirection.DOWN && col === cursor[0]) {
    const minRow = Math.min(row, cursor[1]);
    const maxRow = Math.max(row, cursor[1]);
    const col = cursor[0];
    for (let row = minRow + 1; row < maxRow; row++) {
      if (cells[col]?.[row]?.isBlock) {
        return false;
      }
    }
    return true;
  }

  return false;
}
