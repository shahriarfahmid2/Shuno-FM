import { images } from "@/constants/images";
import { ImageSourcePropType } from "react-native";

export type FavouriteEntry = {
  id: string;
  title: string;
  author: string;
  cover: ImageSourcePropType;
  category: string;
};

/** "Favourites" page (Figma node 6608:5633). */
export const favouriteEntries: FavouriteEntry[] = [
  {
    id: "rich-dad-poor-dad",
    title: "Rich Dad Poor Dad",
    author: "Robert T. Kiyosaki",
    cover: images.homeBookRichDadPoorDad,
    category: "Business",
  },
  {
    id: "exactly-what-to-say",
    title: "Exactly What to Say",
    author: "Phil M Jones",
    cover: images.historyBookExactlyWhatToSay,
    category: "Communication",
  },
  {
    id: "atomic-habits",
    title: "Atomic Habits",
    author: "James Clear",
    cover: images.homeBookAtomicHabits,
    category: "Productivity",
  },
];
