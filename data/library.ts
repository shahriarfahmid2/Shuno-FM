import { images } from "@/constants/images";
import { ImageSourcePropType } from "react-native";

export type LibraryInProgressBook = {
  id: string;
  title: string;
  author: string;
  cover: ImageSourcePropType;
  /** 0-1 listening progress. */
  progress: number;
};

/** "In progress" scroller (Figma "In Progress Scroller", node 6606:4984). */
export const libraryInProgressBooks: LibraryInProgressBook[] = [
  {
    id: "rich-dad-poor-dad-1",
    title: "Rich Dad Poor Dad",
    author: "Robert T. Kiyosaki",
    cover: images.homeBookRichDadPoorDad,
    progress: 0.64,
  },
  {
    id: "rich-dad-poor-dad-2",
    title: "Rich Dad Poor Dad",
    author: "Robert T. Kiyosaki",
    cover: images.homeBookRichDadPoorDad,
    progress: 0.64,
  },
  {
    id: "rich-dad-poor-dad-3",
    title: "Rich Dad Poor Dad",
    author: "Robert T. Kiyosaki",
    cover: images.homeBookRichDadPoorDad,
    progress: 0.64,
  },
];

export type LibraryLink = {
  id: "favourites" | "downloads";
  label: string;
  count: number;
};

/** "Library Links" rows (Figma node 6606:5105). */
export const libraryLinks: LibraryLink[] = [
  { id: "favourites", label: "Favourites", count: 12 },
  { id: "downloads", label: "Downloads", count: 3 },
];
