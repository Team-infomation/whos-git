import { create } from "zustand";

interface SearchStore {
  keyword: string;
  searchResult: any[];
}

export const searchStore = create((set) => ({
  keyword: 0,
  searchResult: [],
  setKeyword: (keyword: string) => set((state: any) => ({ keyword })),
  setSearchResult: (searchResult: any[]) =>
    set((state: any) => ({ searchResult })),
}));
