import { ClueDirection } from "@prisma/client";
import type { PuzzleState } from "~/state/puzzleState";
import { Clue } from "./clue";

export function ClueBank({ clues }: PuzzleState) {
  return (
    <div className="clue-bank grid grid-cols-2">
      {Object.values(ClueDirection).map((dir) => (
        <div className="clue-section w-1/2" key={dir}>
          <h3 className="uppercase font-bold">{dir}</h3>
          {clues[dir].map((clue) => (
            <Clue
              {...clue}
              isSelected={false}
              isHighlighted={false}
              key={`${clue.number}-${clue.direction}`}
            ></Clue>
          ))}
        </div>
      ))}
    </div>
  );
}
