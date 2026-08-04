import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const MAX_HISTORY_ENTRIES = 8;

type AuthorSearchHistoryState = {
  queries: string[];
  addQuery: (query: string) => void;
  removeQuery: (query: string) => void;
};

/**
 * Recent search terms shown on app/author-search.tsx. Kept separate from
 * useSearchHistoryStore (book/general search) since it's a distinct
 * concern — searching people, not the book catalog.
 */
export const useAuthorSearchHistoryStore = create<AuthorSearchHistoryState>()(
  persist(
    (set) => ({
      queries: [],
      addQuery: (query) =>
        set((state) => {
          const trimmed = query.trim();
          if (!trimmed) {
            return state;
          }
          const withoutDuplicate = state.queries.filter(
            (existing) => existing.toLowerCase() !== trimmed.toLowerCase(),
          );
          return { queries: [trimmed, ...withoutDuplicate].slice(0, MAX_HISTORY_ENTRIES) };
        }),
      removeQuery: (query) =>
        set((state) => ({ queries: state.queries.filter((existing) => existing !== query) })),
    }),
    {
      name: "author-search-history",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
