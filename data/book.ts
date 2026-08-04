import { images } from "@/constants/images";
import { author } from "@/data/author";
import { ImageSourcePropType } from "react-native";

export type BookChapter = {
  number: string;
  title: string;
};

export type Book = {
  id: string;
  title: string;
  authorName: string;
  cover: ImageSourcePropType;
  chaptersLabel: string;
  durationLabel: string;
  whatsInsideTitle: string;
  whatsInsideDescription: string;
  whoItsForTitle: string;
  whoItsForDescription: string;
  learnPoints: string[];
  chapters: BookChapter[];
  categoryLabel: string;
};

/** "About Audiobook" page (Figma node 127:407) — Rich Dad Poor Dad's intro/summary content. */
export const book: Book = {
  id: "rich-dad-poor-dad",
  title: "রিচ ড্যাড পুর ড্যাড",
  authorName: author.name,
  cover: images.homeBookRichDadPoorDad,
  chaptersLabel: "৯টি অধ্যায়",
  durationLabel: "১৭ মিনিট",
  whatsInsideTitle: "এই বইয়ে কী রয়েছে?",
  whatsInsideDescription:
    "টাকার জন্য কাজ করা আর টাকাকে আপনার জন্য কাজ করানোর পার্থক্য জানুন। অর্থ ও সম্পদ সম্পর্কে আপনার চিন্তাভাবনা নতুনভাবে গড়ে তুলুন।",
  whoItsForTitle: "কাদের জন্য এই বই?",
  whoItsForDescription:
    "টাকা সম্পর্কে আরও ভালোভাবে জ্ঞ্যান অর্জন করতে চায়, ধনি হতে যায় এবং কিভাবে ইনভেস্ট করতে হয় জানতে চায়",
  learnPoints: [
    "আর্থিক শিক্ষা কী এবং কেন এটি গুরুত্বপূর্ণ",
    "কেন আপনার বসবাসের বাড়ি সব সময় সম্পদ (Asset) নয়",
    "কীভাবে নিজের ব্যবসা শুরু করবেন",
    "করব্যবস্থা (Tax) ও আইনি কাঠামো বোঝা কেন জরুরি",
    "কোথায় এবং কীভাবে বিনিয়োগ করবেন",
  ],
  chapters: [
    { number: "১", title: 'কেন আমরা বারবার "ইঁদুর দৌড়ের" (Rat Race) চক্রে আটকে যাই?' },
    { number: "২", title: "ভয় ও লোভ কীভাবে আমাদের অযৌক্তিক আর্থিক সিদ্ধান্ত নিতে বাধ্য করে" },
    { number: "৩", title: "আর্থিক সফলতার সবচেয়ে গুরুত্বপূর্ণ চাবিকাঠি হলো আত্মশিক্ষা" },
    { number: "৪", title: "সম্পদ গড়তে চাইলে হিসাব করে ঝুঁকি নেওয়ার মানসিকতা গড়ে তুলতে হবে" },
  ],
  categoryLabel: "টাকা এবং ইনভেস্টমেন্ট",
};

export function getBook(id?: string): Book {
  const knownIds = [book.id, "atomic-habits", "let-them-theory", "politics-edge"];
  return (id && knownIds.includes(id) ? book : book) as Book;
}
