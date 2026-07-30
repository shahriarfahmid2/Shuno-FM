import { images } from "@/constants/images";
import { ImageSourcePropType } from "react-native";

export type FeaturedBook = {
  id: string;
  title: string;
  author: string;
  cover: ImageSourcePropType;
};

/** Hero carousel books (Figma "Thumbnails", node 101:1690) — center item is the active one. */
export const featuredBooks: FeaturedBook[] = [
  { id: "atomic-habits", title: "Atomic Habits", author: "James Clear", cover: images.homeBookAtomicHabits },
  { id: "politics-edge", title: "Politic on the edge", author: "Rory Stewart", cover: images.homeBookPoliticsEdge },
  { id: "let-them-theory", title: "The Let Them Theory", author: "Mel Robbins", cover: images.homeBookLetThemTheory },
];

export type BookSummary = {
  id: string;
  title: string;
  cover: ImageSourcePropType;
};

/** "বিজনেস ই-বুক" row (Figma node 101:1709). */
export const businessEbooks: BookSummary[] = [
  { id: "rich-dad-poor-dad", title: "Rich Dad Poor Dad", cover: images.homeBookRichDadPoorDad },
  { id: "atomic-habits", title: "Atomic Habits", cover: images.homeBookAtomicHabits },
  { id: "let-them-theory", title: "The Let Them Theory", cover: images.homeBookLetThemTheory },
  { id: "politics-edge", title: "Politic on the edge", cover: images.homeBookPoliticsEdge },
  { id: "rich-dad-poor-dad-2", title: "Rich Dad Poor Dad", cover: images.homeBookRichDadPoorDad },
];

export type PopularAuthor = {
  id: string;
  name: string;
  avatar: ImageSourcePropType;
};

/** "পরিচিত ক্রিয়েটর" row (Figma node 101:1812). */
export const popularAuthors: PopularAuthor[] = [
  { id: "alex-hormozi", name: "Alex Hormozi", avatar: images.homeAvatarAlexHormozi },
  { id: "gary-vaynerchuk", name: "Gary Vaynerchuk", avatar: images.homeAvatarGaryVaynerchuk },
  { id: "raj-shamani", name: "Raj Shamani", avatar: images.homeAvatarRajShamani },
  { id: "steven-bartlett", name: "Steven Bartlett", avatar: images.homeAvatarStevenBartlett },
  { id: "kevin-oleary", name: "Kevin O'Leary", avatar: images.homeAvatarKevinOleary },
];

export type PodcastSummary = {
  id: string;
  thumbnail: ImageSourcePropType;
};

/** "ইউটিউব পডকাস্ট সামারি" row (Figma node 101:1744). */
export const podcastSummaries: PodcastSummary[] = [
  { id: "80-20-rule", thumbnail: images.homePodcast1 },
  { id: "secrets-of-distribution", thumbnail: images.homePodcast2 },
  { id: "discipline-your-mind", thumbnail: images.homePodcast3 },
];
