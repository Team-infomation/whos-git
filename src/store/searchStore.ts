import { create } from "zustand";

interface SearchStore {
  keyword: string;
  setKeyword: any;
  searchResult: any;
  setSearchResult: any;
  page: number;
  setPage: any;
}

export const searchStore = create<SearchStore>((set) => ({
  keyword: "",
  setKeyword: (keyword: string) => set((state: any) => ({ keyword })),
  searchResult: [],
  setSearchResult: (searchResult: any[]) =>
    set((state: any) => ({ searchResult })),
  page: 1,
  setPage: (page: number) => set((state: any) => ({ page })),
}));
