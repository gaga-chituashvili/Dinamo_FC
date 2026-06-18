import { create } from "zustand";

type Status = "idle" | "loading" | "success" | "error";

interface ContactStore {
  status: Status;
  setStatus: (status: Status) => void;
  reset: () => void;
}

export const useContactStore = create<ContactStore>((set) => ({
  status: "idle",
  setStatus: (status) => set({ status }),
  reset: () => set({ status: "idle" }),
}));
