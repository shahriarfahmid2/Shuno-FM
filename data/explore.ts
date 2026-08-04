import { images } from "@/constants/images";
import { ImageSourcePropType } from "react-native";

export type CategoryIconName = "business" | "psychology" | "career" | "happiness" | "self-growth";

export type ExploreCategoryPill = {
  id: string;
  label: string;
  icon: CategoryIconName;
  iconWidth: number;
  iconHeight: number;
};

/**
 * Category pill rows (Figma nodes 6626:9255-9305) — a horizontally
 * scrollable, 3-row stack of gradient pills. Figma repeats the same 3-pill
 * row (business/psychology/career) as both row 1 and row 3 — kept as-is.
 */
export const exploreCategoryRows: ExploreCategoryPill[][] = [
  [
    { id: "business-1", label: "ব্যবসা", icon: "business", iconWidth: 17, iconHeight: 17 },
    { id: "psychology-1", label: "সাইকোলজি", icon: "psychology", iconWidth: 19.125, iconHeight: 21 },
    { id: "career-1", label: "ক্যারিয়ার", icon: "career", iconWidth: 23, iconHeight: 15 },
  ],
  [
    { id: "happiness-1", label: "হ্যাপিনেস", icon: "happiness", iconWidth: 19, iconHeight: 19 },
    { id: "business-2", label: "ব্যবসা", icon: "business", iconWidth: 15, iconHeight: 15 },
    { id: "self-growth-1", label: "সেলফ গ্রোথ", icon: "self-growth", iconWidth: 19, iconHeight: 21 },
  ],
  [
    { id: "business-3", label: "ব্যবসা", icon: "business", iconWidth: 17, iconHeight: 17 },
    { id: "psychology-2", label: "সাইকোলজি", icon: "psychology", iconWidth: 19.125, iconHeight: 21 },
    { id: "career-2", label: "ক্যারিয়ার", icon: "career", iconWidth: 23, iconHeight: 15 },
  ],
];

export type ExploreBook = {
  id: string;
  title: string;
  author: string;
  cover: ImageSourcePropType;
};

/** "বিজনেস ই-বুক" row content (Figma nodes 6581:44702, 6606:4512, 6606:4545). */
export const exploreFeaturedBooks: ExploreBook[] = [
  { id: "rich-dad-poor-dad", title: "Rich Dad Poor Dad", author: "Robert T. Kiyosaki", cover: images.homeBookRichDadPoorDad },
  { id: "atomic-habits", title: "Atomic Habits", author: "James Clear", cover: images.homeBookAtomicHabits },
  { id: "let-them-theory", title: "The Let Them Theory", author: "Mel Robbins", cover: images.homeBookLetThemTheory },
  { id: "politics-edge", title: "Politic on the edge", author: "Rory Stewart", cover: images.homeBookPoliticsEdge },
];

/** Figma repeats the same "বিজনেস ই-বুক" row three times on this page — kept as-is. */
export const exploreBookSections = [
  { id: "section-1", title: "বিজনেস ই-বুক", books: exploreFeaturedBooks },
  { id: "section-2", title: "বিজনেস ই-বুক", books: exploreFeaturedBooks },
  { id: "section-3", title: "বিজনেস ই-বুক", books: exploreFeaturedBooks },
];
