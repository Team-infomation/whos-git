import { create } from "zustand";

interface SearchStore {
  keyword: string;
  setKeyword: (keyword: string) => void;
  searchResult: unknown;
  setSearchResult: (searchResult: object[]) => void;
  page: number;
  setPage: (page: number) => void;
}

export const searchStore = create<SearchStore>((set) => ({
  keyword: "",
  setKeyword: (keyword: string) => set(() => ({ keyword })),
  searchResult: null,
  setSearchResult: (searchResult: object) => set(() => ({ searchResult })),
  page: 1,
  setPage: (page: number) => set(() => ({ page })),
}));
