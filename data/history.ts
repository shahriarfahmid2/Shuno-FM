import { images } from "@/constants/images";
import { ImageSourcePropType } from "react-native";

export type HistoryStatus = "in-progress" | "finished";

export type HistoryEntry = {
  id: string;
  title: string;
  author: string;
  cover: ImageSourcePropType;
  status: HistoryStatus;
  /** 0-1 listening progress. */
  progress: number;
  /** Minutes left in the summary — only shown for "in-progress" entries. */
  minutesLeft?: number;
};

/** "My History" page (Figma node 6607:5234). */
export const historyEntries: HistoryEntry[] = [
  {
    id: "rich-dad-poor-dad",
    title: "Rich Dad Poor Dad",
    author: "Robert T. Kiyosaki",
    cover: images.homeBookRichDadPoorDad,
    status: "in-progress",
    progress: 0.77,
    minutesLeft: 3,
  },
  {
    id: "exactly-what-to-say",
    title: "Exactly What to Say",
    author: "Phil M Jones",
    cover: images.historyBookExactlyWhatToSay,
    status: "in-progress",
    progress: 0.57,
    minutesLeft: 7,
  },
  {
    id: "atomic-habits",
    title: "Atomic Habits",
    author: "James Clear",
    cover: images.homeBookAtomicHabits,
    status: "in-progress",
    progress: 0.57,
    minutesLeft: 7,
  },
  {
    id: "let-them-theory",
    title: "The Let Them Theory",
    author: "Mel Robbins",
    cover: images.homeBookLetThemTheory,
    status: "finished",
    progress: 1,
  },
];
