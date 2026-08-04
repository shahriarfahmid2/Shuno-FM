import { book } from "@/data/book";

export type PlayerPoint = {
  number: string;
  title: string;
  durationLabel: string;
};

/**
 * "Now Playing" page (Figma node 132:1498) — reuses the book's own chapter
 * list as its key-point queue, since the title text matches verbatim.
 */
export const player = {
  cover: book.cover,
  title: book.title,
  totalPointsLabel: "১১",
  // The Figma source renders these two labels in plain English digits
  // (unlike the rest of the screen's Bangla text), so they stay Latin here.
  positionLabel: "16:27",
  remainingLabel: "10:34",
  progress: 124.42584991455078 / 303,
  points: book.chapters.map((chapter): PlayerPoint => ({
    ...chapter,
    durationLabel: "৫মিনিট ২২ সেকেন্ড",
  })),
};
