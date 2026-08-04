import { images } from "@/constants/images";
import { ImageSourcePropType } from "react-native";

export type SearchableBook = {
  id: string;
  title: string;
  author: string;
  cover: ImageSourcePropType;
};

/**
 * Catalog searched by the search page. Mirrors the same books already
 * shown on the home/explore screens (data/home.ts, data/explore.ts) — once
 * the catalog moves to Supabase, this is the function to point at a real
 * query instead of this array.
 */
export const searchCatalog: SearchableBook[] = [
  { id: "rich-dad-poor-dad", title: "Rich Dad Poor Dad", author: "Robert T. Kiyosaki", cover: images.homeBookRichDadPoorDad },
  { id: "atomic-habits", title: "Atomic Habits", author: "James Clear", cover: images.homeBookAtomicHabits },
  { id: "let-them-theory", title: "The Let Them Theory", author: "Mel Robbins", cover: images.homeBookLetThemTheory },
  { id: "politics-edge", title: "Politic on the edge", author: "Rory Stewart", cover: images.homeBookPoliticsEdge },
];

/** Case-insensitive match on title or author. */
export function searchBooks(query: string): SearchableBook[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return [];
  }
  return searchCatalog.filter(
    (book) => book.title.toLowerCase().includes(normalized) || book.author.toLowerCase().includes(normalized),
  );
}
