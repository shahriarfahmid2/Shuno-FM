import { images } from "@/constants/images";
import { ImageSourcePropType } from "react-native";

export type DownloadEntry = {
  id: string;
  title: string;
  author: string;
  cover: ImageSourcePropType;
  status: "downloaded" | "downloading";
  /** Shown in the badge for "downloaded" entries, e.g. "412 MB". */
  sizeLabel?: string;
  /** 0-1 download progress — only used for "downloading" entries. */
  progress?: number;
};

/** "Downloads" page (Figma node 6608:5858). */
export const downloadEntries: DownloadEntry[] = [
  {
    id: "rich-dad-poor-dad",
    title: "Rich Dad Poor Dad",
    author: "Robert T. Kiyosaki",
    cover: images.homeBookRichDadPoorDad,
    status: "downloaded",
    sizeLabel: "412 MB",
  },
  {
    id: "exactly-what-to-say",
    title: "Exactly What to Say",
    author: "Phil M Jones",
    cover: images.historyBookExactlyWhatToSay,
    status: "downloaded",
    sizeLabel: "412 MB",
  },
  {
    id: "atomic-habits",
    title: "Atomic Habits",
    author: "James Clear",
    cover: images.homeBookAtomicHabits,
    status: "downloading",
    progress: 0.63,
  },
];
