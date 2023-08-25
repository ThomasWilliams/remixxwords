import type { V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { db } from "~/utils/db.server";

export const meta: V2_MetaFunction = () => {
  return [{ title: "XWORDS" }];
};

export const loader = async () => {
  const puzzles = await db.puzzle.findMany({
    take: 5,
    select: { id: true, name: true },
    orderBy: { createdAt: "desc" },
  });
  return json({ puzzles });
};

export default function Index() {
  const { puzzles } = useLoaderData<typeof loader>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Available Puzzles</h1>
      <ul>
        {puzzles.map(({ name, id }) => (
          <li key={id}>
            <Link prefetch="intent" to={`puzzles/${id}`}>
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
