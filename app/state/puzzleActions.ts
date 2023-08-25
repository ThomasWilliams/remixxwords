import { ClueDirection } from "@prisma/client";
import { Movement, MovementVector } from "./puzzleState";
import type { Draft } from "immer";
import type { CellState, PuzzleState } from "./puzzleState";

export function handleKeyPress(draft: Draft<PuzzleState>, keyCode: string) {
  if (keyCode.startsWith("Arrow")) {
    const movement: Movement = keyCode.replace("Arrow", "") as Movement;
    if (
      ((movement === Movement.UP || movement === Movement.DOWN) &&
        draft.direction === ClueDirection.DOWN) ||
      ((movement === Movement.LEFT || movement === Movement.RIGHT) &&
        draft.direction === ClueDirection.ACROSS)
    ) {
      move(draft, movement);
    } else {
      switchDirection(draft);
    }
  }

  if (keyCode.startsWith("Key")) {
    const char = keyCode.replace("Key", "");
    enterUserFill(draft, char);
  }

  if (keyCode === "Backspace") {
    removeUserFill(draft);
  }

  if (keyCode === "Tab") {
    moveToNextWord(draft);
  }

  if (keyCode === "Space") {
    switchDirection(draft);
  }
}

export function handleMouseClick(draft: Draft<PuzzleState>, cellKey: string) {}

function move(
  draft: Draft<PuzzleState>,
  movement: Movement,
  keepGoing = false
) {
  const [dx, dy] = MovementVector[movement];
  let [x, y] = draft.cursor;
  while (true) {
    x += dx;
    y += dy;
    if (x < 0 || x >= draft.width || y < 0 || y >= draft.height) {
      return;

      // TODO: Do we need to offer an option for endless rotations?
      //       The solution below is gross, but would work.

      // if (!keepGoing) return;

      // if (movement === Movement.UP) {
      //   if (x === 0) return;
      //   x--;
      //   y = draft.height - 1;
      // }

      // if (movement === Movement.DOWN) {
      //   if (x === draft.width - 1) return;
      //   x++;
      //   y = 0;
      // }

      // if (movement === Movement.LEFT) {
      //   if (y === 0) return;
      //   y--;
      //   x = draft.width - 1;
      // }

      // if (movement === Movement.RIGHT) {
      //   if (y === draft.height - 1) return;
      //   y--;
      //   x = 0;
      // }
    }

    if (!draft.cells[y][x].isBlock) {
      draft.cursor = [x, y];
      return;
    }
  }
}

function enterUserFill(draft: Draft<PuzzleState>, userFill: string) {
  setUserFillForCurrentCell(draft, userFill);
  const movement =
    draft.direction === ClueDirection.ACROSS ? Movement.RIGHT : Movement.DOWN;
  move(draft, movement);
}

function removeUserFill(draft: Draft<PuzzleState>) {
  const currentUserFill = getUserFillForCurrentCell(draft);
  if (!currentUserFill) {
    move(
      draft,
      draft.direction === ClueDirection.ACROSS ? Movement.LEFT : Movement.UP
    );
  }
  setUserFillForCurrentCell(draft, "");
}

function moveToNextWord(draft: Draft<PuzzleState>) {}

function switchDirection(draft: Draft<PuzzleState>) {
  draft.direction =
    draft.direction === ClueDirection.ACROSS
      ? ClueDirection.DOWN
      : ClueDirection.ACROSS;
}

function getCurrentCell(draft: Draft<PuzzleState>): CellState {
  const [x, y] = draft.cursor;
  return draft.cells[y][x];
}

function getUserFillForCurrentCell(draft: Draft<PuzzleState>): string {
  const currentCell = getCurrentCell(draft);
  return currentCell.userFill ?? "";
}

function setUserFillForCurrentCell(
  draft: Draft<PuzzleState>,
  userFill: string
) {
  const currentCell = getCurrentCell(draft);
  currentCell.userFill = userFill;
}

function getCurrentClueNumber(draft: Draft<PuzzleState>) {
  const [x, y] = draft.cursor;
  const [dw, dy] =
    MovementVector[
      draft.direction === ClueDirection.ACROSS ? Movement.RIGHT : Movement.UP
    ];

  // while (!draft.cells[y][x].number)
}
