import { create } from "zustand";

interface SearchStore {
  keyword: string;
  setKeyword: any;
  searchResult: any;
  setSearchResult: any;
}

export const searchStore = create<SearchStore>((set) => ({
  keyword: "",
  searchResult: [],
  setKeyword: (keyword: string) => set((state: any) => ({ keyword })),
  setSearchResult: (searchResult: any[]) =>
    set((state: any) => ({ searchResult })),
}));
