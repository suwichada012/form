import { create } from "zustand";

interface Store {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const useStore = create<Store>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}));

export default useStore;
