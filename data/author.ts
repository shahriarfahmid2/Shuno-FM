import { images } from "@/constants/images";
import { ImageSourcePropType } from "react-native";

export type AuthorBook = {
  id: string;
  title: string;
  cover: ImageSourcePropType;
};

export type Author = {
  id: string;
  name: string;
  avatar: ImageSourcePropType;
  bio: string;
  books: AuthorBook[];
};

/** "Author Page" (Figma node 6575:44568). */
export const author: Author = {
  id: "robert-kiyosaki",
  name: "রবার্ট কিয়োসাকি",
  avatar: images.authorAvatarRobertKiyosaki,
  bio: 'রবার্ট কিয়োসাকি একজন উদ্যোক্তা, বিনিয়োগকারী, শিক্ষাবিদ এবং বিশ্ববিখ্যাত "রিচ ড্যাড, পুওর ড্যাড" সিরিজের লেখক। তাঁর বই বিশ্বজুড়ে লক্ষ লক্ষ মানুষের অর্থ, বিনিয়োগ ও সম্পদ গড়ার দৃষ্টিভঙ্গি বদলে দিয়েছে।',
  books: [{ id: "rich-dad-poor-dad", title: "Rich Dad Poor Dad", cover: images.homeBookRichDadPoorDad }],
};

export function getAuthor(id?: string): Author {
  const knownIds = [author.id, "alex-hormozi", "gary-vaynerchuk", "raj-shamani", "steven-bartlett", "kevin-oleary"];
  return (id && knownIds.includes(id) ? author : author) as Author;
}

export type AuthorCategory = {
  id: string;
  label: string;
};

/** Filter categories — the tag words that actually appear on the author
 * cards below (Figma node 6646:4284), not the unrelated book categories
 * from data/explore.ts. */
export const authorCategories: AuthorCategory[] = [
  { id: "business", label: "বিজনেস" },
  { id: "invest", label: "ইনভেস্ট" },
  { id: "money", label: "টাকা" },
  { id: "motivation", label: "মটিভেশন" },
  { id: "self-growth", label: "সেলফ গ্রোথ" },
  { id: "politics", label: "পলিটিক্স" },
  { id: "productivity", label: "প্রডাক্টিভিটি" },
];

export type AuthorListItem = {
  id: string;
  name: string;
  avatar: ImageSourcePropType;
  /** Mel Robbins/Rory Stewart's source photos are tall upper-body shots
   * with the face near the top — a center crop (the default) pushes their
   * face out of the circle, so those two anchor to the top instead. */
  avatarPosition: "center" | "top";
  tagsLabel: string;
  categoryIds: string[];
  bookCount: string;
};

/** The 4 real author cards from the Figma design (node 6646:4284). */
export const authorListBase: AuthorListItem[] = [
  {
    id: "robert-kiyosaki",
    name: "Robert T. Kiyosaki",
    avatar: images.authorAvatarRobertKiyosaki,
    avatarPosition: "center",
    tagsLabel: "বিজনেস, ইনভেস্ট, টাকা",
    categoryIds: ["business", "invest", "money"],
    bookCount: "৪",
  },
  {
    id: "mel-robbins",
    name: "Mel Robbin",
    avatar: images.authorAvatarMelRobbins,
    avatarPosition: "top",
    tagsLabel: "মটিভেশন, সেলফ গ্রোথ",
    categoryIds: ["motivation", "self-growth"],
    bookCount: "১",
  },
  {
    id: "james-clear",
    name: "James Clear",
    avatar: images.authorAvatarJamesClear,
    avatarPosition: "center",
    tagsLabel: "সেলফ গ্রোথ, প্রডাক্টিভিটি",
    categoryIds: ["self-growth", "productivity"],
    bookCount: "১",
  },
  {
    id: "rory-stewart",
    name: "Rory Stewart",
    avatar: images.authorAvatarRoryStewart,
    avatarPosition: "top",
    tagsLabel: "পলিটিক্স",
    categoryIds: ["politics"],
    bookCount: "১",
  },
];

/**
 * The Figma design only has 4 real author cards, but the page needs a
 * longer list to demo category filtering + pagination — cycles the 4 real
 * entries with unique ids to reach `total`, the same "repeat placeholder
 * content" approach already used for data/category.ts's repeatBooks.
 */
function repeatAuthors(base: AuthorListItem[], total: number): AuthorListItem[] {
  return Array.from({ length: total }, (_, index) => ({
    ...base[index % base.length],
    id: `${base[index % base.length].id}-${index}`,
  }));
}

/** Author listing page (Figma node 6646:4284) — "See all" target for the "বেস্ট সেলার লেখক" section on home. */
export const authors: AuthorListItem[] = repeatAuthors(authorListBase, 22);

/**
 * Case-insensitive match on author name — used by app/author-search.tsx.
 * Searches `authorListBase` (the 4 distinct authors), not `authors`
 * (repeatAuthors' pagination duplicates), so a match doesn't show the same
 * author several times.
 */
export function searchAuthors(query: string): AuthorListItem[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return [];
  }
  return authorListBase.filter((item) => item.name.toLowerCase().includes(normalized));
}
