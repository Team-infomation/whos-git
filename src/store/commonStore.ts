import { create } from "zustand";

interface CommonStroe {
  resultPage: boolean;
  headerFixed: boolean;
}

export const commonStroe = create<CommonStroe>((set) => ({
  resultPage: false,
  setResultPage: (resultPage: boolean) => set(() => ({ resultPage })),
  headerFixed: false,
  setHeaderFixed: (headerFixed: boolean) => set(() => ({ headerFixed })),
}));
