import { create } from "zustand";

interface ModalType {
  open: boolean;
  data?: string;
  type?: string | null;
}

interface ModalStoreType {
  modal: ModalType;
  openModal: ({ data, type }: { data?: any; type?: string }) => void;
  closeModal: () => void;
  appNotificationCount?: number | null;
  setAppNotificationCount?: (id?: number) => void;
}

export const useModal = create<ModalStoreType>((set) => ({
  modal: {
    open: false,
    data: "",
    type: null,
  },
  appNotificationCount: 0,
  setAppNotificationCount: (appNotificationCount) =>
    set({ appNotificationCount }),
  openModal: ({ data = null, type }) =>
    set({
      modal: {
        open: true,
        data,
        type,
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
