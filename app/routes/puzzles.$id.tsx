import type { V2_MetaFunction, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ClueBank } from "~/components/clueBank";
import { Grid } from "~/components/grid";
import { db } from "~/utils/db.server";
import { useEffect } from "react";
import { PuzzleActionType, usePuzzleReducer } from "~/state/puzzleReducer";

export const meta: V2_MetaFunction = () => {
  return [{ title: "XWORDS" }];
};

export const loader = async ({ params }: LoaderArgs) => {
  const { id } = params;
  const puzzle = await db.puzzle.findUnique({ where: { id } });
  if (!puzzle) throw new Response(`puzzle not found`, { status: 404 });
  return json({ puzzle });
};

export default function PuzzleRoute() {
  const { puzzle } = useLoaderData<typeof loader>();
  if (!puzzle) {
    throw new Error();
  }

  const [puzzleState, dispatch] = usePuzzleReducer(puzzle);

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      console.log(event.key);
      console.log(event.code);
      if (event.altKey || event.metaKey || event.ctrlKey) return;
      dispatch({ type: PuzzleActionType.KEY_PRESS, keyCode: event.code });
    };

    window.addEventListener("keydown", keyDownHandler);

    return () => {
      window.removeEventListener("keydown", keyDownHandler);
    };
  }, [dispatch]);

  return (
    <div className="inline-flex">
      <Grid {...puzzleState} />
      <ClueBank {...puzzleState} />
    </div>
  );
}
