import { create } from "zustand";

interface CommonStroe {
  resultPage: boolean;
}

export const commonStroe = create<CommonStroe>((set) => ({
  resultPage: false,
  setResultPage: (resultPage: boolean) => set((state: any) => ({ resultPage })),
}));
