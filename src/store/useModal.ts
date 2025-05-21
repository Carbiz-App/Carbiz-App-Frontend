import { create } from "zustand";

interface ModalType {
  open: boolean;
  data?: string;
}

interface ModalStoreType {
  modal: ModalType;
  openModal: (data?: any) => void;
  closeModal: () => void;
}

export const useModal = create<ModalStoreType>((set) => ({
  modal: {
    open: false,
    data: "",
  },
  openModal: (data = null) =>
    set({
      modal: {
        open: true,
        data,
      },
    }),
  closeModal: () =>
    set({
      modal: {
        open: false,
        data: "",
      },
    }),
}));
