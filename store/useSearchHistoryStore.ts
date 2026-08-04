import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const MAX_HISTORY_ENTRIES = 8;

type SearchHistoryState = {
  queries: string[];
  addQuery: (query: string) => void;
  removeQuery: (query: string) => void;
};

/**
 * Recent search terms shown on the search page (Figma "Search History",
 * node 6629:9398). Local-only preference — not catalog data, so it doesn't
 * belong in useCatalogStore or Supabase.
 */
export const useSearchHistoryStore = create<SearchHistoryState>()(
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
      name: "search-history",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
