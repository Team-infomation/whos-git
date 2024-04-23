import { create } from "zustand";

interface CommonStore {
  resultPage: boolean;
  setResultPage: any;
  headerFixed: boolean;
  setHeaderFixed: any;
}

export const commonStore = create<CommonStore>((set) => ({
  resultPage: false,
  setResultPage: (resultPage: boolean) => set(() => ({ resultPage })),
  headerFixed: false,
  setHeaderFixed: (headerFixed: boolean) => set(() => ({ headerFixed })),
}));
