import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type BookProgress = {
  position: number;
  completedPercent: number;
  lastPlayedAt: number;
};

type LibraryState = {
  progressByBookId: Record<string, BookProgress>;
};

/**
 * Per-book listening progress (AGENTS.md's `useLibraryStore`). Only the
 * read side exists so far — no player screen writes to this yet, so it's
 * seeded with the same "already in progress" Rich Dad Poor Dad entry used
 * by data/history.ts and data/library.ts, which the book intro page reads
 * to decide between "এখন শুনুন" and "Continue করুন".
 */
export const useLibraryStore = create<LibraryState>()(
  persist(
    () => ({
      progressByBookId: {
        "rich-dad-poor-dad": { position: 0, completedPercent: 0.77, lastPlayedAt: Date.now() },
      } as Record<string, BookProgress>,
    }),
    {
      name: "library-progress",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
