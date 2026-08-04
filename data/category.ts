import { images } from "@/constants/images";
import { ImageSourcePropType } from "react-native";

export type CategoryBook = {
  id: string;
  title: string;
  author: string;
  description: string;
  duration: string;
  cover: ImageSourcePropType;
};

export type Category = {
  id: string;
  title: string;
  books: CategoryBook[];
};

/** The 5 real books from the Figma design (node 6648:4907). */
const businessBaseBooks: CategoryBook[] = [
  {
    id: "atomic-habits",
    title: "Atomic Habits",
    author: "James Clear",
    description: "ভালো অভ্যাস গড়ে তোলা এবং খারাপ অভ্যাস ছাড়ার সহজ ও কার্যকর উপায়",
    duration: "৭ মিনিট",
    cover: images.homeBookAtomicHabits,
  },
  {
    id: "exactly-what-to-say",
    title: "Exactly What To Say",
    author: "Phil M Jones",
    description: "মানুষকে প্রভাবিত করার জাদুকরী শব্দ",
    duration: "৭ মিনিট",
    cover: images.historyBookExactlyWhatToSay,
  },
  {
    id: "rich-dad-poor-dad",
    title: "Rich Dad Poor Dad",
    author: "Robert T. Kiyosaki",
    description: "টাকা সম্পর্কে এমন শিক্ষা, যা ধনীরা তাদের সন্তানদের দেয়, কিন্তু দরিদ্র ও মধ্যবিত্তরা দেয় না",
    duration: "৭ মিনিট",
    cover: images.homeBookRichDadPoorDad,
  },
  {
    id: "let-them-theory",
    title: "The Let Them Theory",
    author: "Mel Robbins",
    description: "ভালো অভ্যাস গড়ে তোলা এবং খারাপ অভ্যাস ছাড়ার সহজ ও কার্যকর উপায়",
    duration: "৭ মিনিট",
    cover: images.homeBookLetThemTheory,
  },
  {
    id: "politics-edge",
    title: "Politics On the Edge",
    author: "Rory Stewart",
    description: "ভালো অভ্যাস গড়ে তোলা এবং খারাপ অভ্যাস ছাড়ার সহজ ও কার্যকর উপায়",
    duration: "৭ মিনিট",
    cover: images.homeBookPoliticsEdge,
  },
];

/**
 * The Figma design only has 5 real books, but the page needs a longer list
 * to demo pagination — cycles the 5 real entries with unique ids to reach
 * `total`, the same "repeat placeholder content" approach already used for
 * explore.tsx's repeated "বিজনেস ই-বুক" sections.
 */
function repeatBooks(base: CategoryBook[], total: number): CategoryBook[] {
  return Array.from({ length: total }, (_, index) => ({ ...base[index % base.length], id: `${base[index % base.length].id}-${index}` }));
}

/** Category listing page (Figma node 6648:4907) — "See all" target for the "বিজনেস ই-বুক" sections on home and explore. */
export const categories: Record<string, Category> = {
  business: {
    id: "business",
    title: "বিজনেস",
    books: repeatBooks(businessBaseBooks, 25),
  },
};

export function getCategory(id?: string): Category {
  return (id && categories[id]) || categories.business;
}
