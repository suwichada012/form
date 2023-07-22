import { create } from "zustand";
import { type User } from "./types";
interface Store {
  open: boolean;
  setOpen: (open: boolean) => void;
  users: User[];
  setUsers: (users: User[]) => void;
}

const useStore = create<Store>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
  users: [],
  setUsers: (users) => set({ users }),
}));

export default useStore;
