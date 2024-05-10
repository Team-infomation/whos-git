import { create } from "zustand";

type ResultProps = {
  avatar_url: string;
  events_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  html_url: string;
  id: number;
  login: string;
  node_id: string;
  organizations_url: string;
  received_events_url: string;
  repos_url: string;
  score: number;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  type: string;
  url: string;
  total_count: number;
  items: any;
};
interface SearchStore {
  keyword: string;
  setKeyword: (keyword: string) => void;
  searchResult: ResultProps | null;
  setSearchResult: (searchResult: ResultProps) => void;
  page: number;
  setPage: (page: number) => void;
}

export const searchStore = create<SearchStore>((set) => ({
  keyword: "",
  setKeyword: (keyword: string) => set(() => ({ keyword })),
  searchResult: null,
  setSearchResult: (searchResult: ResultProps) => set(() => ({ searchResult })),
  page: 1,
  setPage: (page: number) => set(() => ({ page })),
}));
