import { useImmerReducer } from "use-immer";
import { handleKeyPress, handleMouseClick } from "./puzzleActions";
import { type Draft } from "immer";
import type { PuzzleInput, PuzzleState } from "./puzzleState";
import { initializePuzzleState } from "./puzzleState";

export enum PuzzleActionType {
  KEY_PRESS,
  CELL_MOUSE_CLICK,
  CLUE_MOUSE_CLICK,
}

export type PuzzleAction =
  | { type: PuzzleActionType.KEY_PRESS; keyCode: string }
  | { type: PuzzleActionType.CELL_MOUSE_CLICK; cellKey: string }
  | { type: PuzzleActionType.CLUE_MOUSE_CLICK; clueKey: string };

export function puzzleReducer(draft: Draft<PuzzleState>, action: PuzzleAction) {
  switch (action.type) {
    case PuzzleActionType.KEY_PRESS:
      return handleKeyPress(draft, action.keyCode);
    case PuzzleActionType.CELL_MOUSE_CLICK:
      return handleMouseClick(draft, action.cellKey);
    case PuzzleActionType.CLUE_MOUSE_CLICK:
      return handleMouseClick(draft, action.clueKey);
    default:
    // throw Error(`Unknown action: ${action.type}`);
  }
}

export function usePuzzleReducer(puzzle: PuzzleInput) {
  return useImmerReducer(puzzleReducer, puzzle, initializePuzzleState);
}
