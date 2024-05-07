import { create } from "zustand";

interface CommonStore {
  resultPage: boolean;
  setResultPage: (resultPage: boolean) => void;
  headerFixed: boolean;
  setHeaderFixed: (headerFixed: boolean) => void;
  detailView: string;
  setDetailView: (detailView: "userInfo" | "repoInfo") => void;
  tabActive: string;
  setTabActive: (tabActive: string) => void;
}

export const commonStore = create<CommonStore>((set) => ({
  resultPage: false,
  setResultPage: (resultPage: boolean) => set(() => ({ resultPage })),
  headerFixed: false,
  setHeaderFixed: (headerFixed: boolean) => set(() => ({ headerFixed })),
  detailView: "userInfo",
  setDetailView: (detailView: string) => set(() => ({ detailView })),
  tabActive: "readme",
  setTabActive: (tabActive: string) => set(() => ({ tabActive })),
}));
