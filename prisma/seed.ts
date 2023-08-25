import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
  await db.puzzle.create({
    data: {
      name: "2023-05-22 NYT Mini",
      author: "Joel Fagliano",
      cells: [
        { x: 0, y: 0, isBlock: true, number: 1 },
        { x: 1, y: 0, isBlock: true, number: 2 },
        { x: 2, y: 0, fill: "R", number: 3 },
        { x: 3, y: 0, fill: "O" },
        { x: 4, y: 0, fill: "E" },
        { x: 0, y: 1, isBlock: true },
        { x: 1, y: 1, fill: "R", number: 4 },
        { x: 2, y: 1, fill: "O" },
        { x: 3, y: 1, fill: "W" },
        { x: 4, y: 1, fill: "S" },
        { x: 0, y: 2, fill: "R", number: 5 },
        { x: 1, y: 2, fill: "O" },
        { x: 2, y: 2, fill: "S" },
        { x: 3, y: 2, fill: "E" },
        { x: 4, y: 2, fill: "S" },
        { x: 0, y: 3, fill: "I", number: 6 },
        { x: 1, y: 3, fill: "B" },
        { x: 2, y: 3, fill: "I" },
        { x: 3, y: 3, fill: "S" },
        { x: 4, y: 3, isBlock: true },
        { x: 0, y: 4, fill: "M", number: 7 },
        { x: 1, y: 4, fill: "E" },
        { x: 2, y: 4, fill: "N" },
        { x: 3, y: 4, isBlock: true },
        { x: 4, y: 4, isBlock: true },
      ],
      clues: [
        { number: 1, direction: "ACROSS", text: `Fise eggs` },
        { number: 4, direction: "ACROSS", text: `Columns' counterparts` },
        {
          number: 5,
          direction: "ACROSS",
          text: `What "Moses supposes his toeses are," in a classic show tune`,
        },
        {
          number: 6,
          direction: "ACROSS",
          text: `Shore bird with a curved beak`,
        },
        { number: 7, direction: "ACROSS", text: `"All the President's ___"` },
        { number: 1, direction: "DOWN", text: `Violin bow application` },
        { number: 3, direction: "DOWN", text: `Gets a Venmo request, say` },
        { number: 2, direction: "DOWN", text: `Suffix with host or heir` },
        { number: 4, direction: "DOWN", text: `Post-shower wear` },
        { number: 5, direction: "DOWN", text: `Edge of a canyon` },
      ],
    },
  });

  await db.puzzle.create({
    data: {
      name: "My first try",
      author: "Thomas Williams",
      cells: [
        { x: 0, y: 0, fill: "F", number: 1 },
        { x: 1, y: 0, fill: "R", number: 2 },
        { x: 2, y: 0, fill: "A", number: 3 },
        { x: 3, y: 0, fill: "T", number: 4 },
        { x: 4, y: 0, isBlock: true },
        { x: 0, y: 1, fill: "A", number: 5 },
        { x: 1, y: 1, fill: "I" },
        { x: 2, y: 1, fill: "L" },
        { x: 3, y: 1, fill: "E" },
        { x: 4, y: 1, fill: "D", number: 6 },
        { x: 0, y: 2, fill: "I", number: 7 },
        { x: 1, y: 2, fill: "L" },
        { x: 2, y: 2, fill: "A" },
        { x: 3, y: 2, fill: "N" },
        { x: 4, y: 2, fill: "A" },
        { x: 0, y: 3, fill: "L", number: 8 },
        { x: 1, y: 3, fill: "E" },
        { x: 2, y: 3, fill: "M" },
        { x: 3, y: 3, fill: "O" },
        { x: 4, y: 3, fill: "N" },
        { x: 0, y: 4, isBlock: true },
        { x: 1, y: 4, fill: "D", number: 9 },
        { x: 2, y: 4, fill: "O" },
        { x: 3, y: 4, fill: "R" },
        { x: 4, y: 4, fill: "K" },
      ],
      clues: [
        {
          number: 1,
          direction: "ACROSS",
          text: `College social group, informally`,
        },
        {
          number: 5,
          direction: "ACROSS",
          text: `Was sick`,
        },
        {
          number: 7,
          direction: "ACROSS",
          text: `Actress Glazer of "Broad City"`,
        },
        {
          number: 8,
          direction: "ACROSS",
          text: `Bad wheels?`,
        },
        {
          number: 9,
          direction: "ACROSS",
          text: `Uncool one`,
        },
        { number: 1, direction: "DOWN", text: `Epic ___` },
        { number: 2, direction: "DOWN", text: `Excited, with "up"` },
        { number: 3, direction: "DOWN", text: `"Remember the ___"` },
        { number: 4, direction: "DOWN", text: `Vocal range below alto` },
        { number: 6, direction: "DOWN", text: `Like many basements` },
      ],
    },
  });
}

seed();
