import type { PuzzleClue, PuzzleCell, Puzzle } from "@prisma/client";
import { ClueDirection } from "@prisma/client";

export type PuzzleInput = Omit<Puzzle, "createdAt" | "updatedAt">;

export type CellState = Omit<PuzzleCell, "x" | "y"> & { userFill?: string };

export type ClueState = PuzzleClue;

export type PuzzleState = {
  cells: CellState[][];
  clues: { [key in ClueDirection]: PuzzleClue[] };
  cursor: [number, number];
  direction: ClueDirection;
  width: number;
  height: number;
};

export enum Movement {
  LEFT = "Left",
  RIGHT = "Right",
  UP = "Up",
  DOWN = "Down",
}

export const MovementVector = {
  [Movement.LEFT]: [-1, 0],
  [Movement.RIGHT]: [1, 0],
  [Movement.UP]: [0, -1],
  [Movement.DOWN]: [0, 1],
};

export function initializePuzzleState(puzzle: PuzzleInput): PuzzleState {
  const [maxX, maxY] = puzzle.cells.reduce(
    ([mx, my], { x, y }) => [Math.max(mx, x), Math.max(my, y)],
    [0, 0]
  );
  const [width, height] = [maxX + 1, maxY + 1];

  const cells: CellState[][] = Array(height)
    .fill(false)
    .map((_) => []);

  for (const { x, y, number, isBlock, fill } of puzzle.cells) {
    const cellState: CellState = { number, isBlock, fill };
    cells[y][x] = cellState;
  }

  const acrossClues = puzzle.clues
    .filter(({ direction }) => direction === ClueDirection.ACROSS)
    .sort((a, b) => a.number - b.number);

  const downClues = puzzle.clues
    .filter(({ direction }) => direction === ClueDirection.DOWN)
    .sort((a, b) => a.number - b.number);

  return {
    cells,
    width,
    height,
    clues: {
      [ClueDirection.ACROSS]: acrossClues,
      [ClueDirection.DOWN]: downClues,
    },
    cursor: [0, 0],
    direction: ClueDirection.ACROSS,
  };
}
