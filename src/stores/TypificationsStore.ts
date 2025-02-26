import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type Typing = {
  id: string;
  idTelephonyTyping: number | string;
  campaignId: number;
  telephonySupplierId: number;
  clave: string;
  name: string;
  active: boolean;
};

interface TypificationsStore {
  typifications: Typing[];
  errorMessage: string | null;
  telephonySupplierId?: number;
  editingTypification: Typing | null;

  setError: (message: string | null) => void;
  clearError: () => void;
  setTelephonySupplierId: (id?: number) => void;
  setTypifications: (typifications: Typing[]) => void;
  setEditingTypification: (typing: Typing | null) => void;

  addTypification: (typing: Omit<Typing, "id">) => boolean;
  updateTypification: (id: string, updatedTypification: Partial<Typing>) => void;
  toggleActive: (id: string) => void;
  removeTypification: (id: string) => void;
}

export const useTypificationsStore = create<TypificationsStore>()(
  immer((set, get) => ({
    typifications: [],
    editingTypification: null,
    errorMessage: null,
    telephonySupplierId: undefined,

    setError: (message) => set({ errorMessage: message }),
    clearError: () => set({ errorMessage: null }),
    setTelephonySupplierId: (id) => set({ telephonySupplierId: id }),
    setTypifications: (data) => set({ typifications: data }),
    setEditingTypification: (typing) => set({ editingTypification: typing }),

    addTypification: (typing) => {
      const { typifications } = get();
      if (typifications.some((item) => item.clave === typing.clave)) {
        set({ errorMessage: `La clave "${typing.clave}" ya existe.` });
        return false;
      }

      set((state) => {
        const newId = String(state.typifications.length + 1);
        state.typifications.push({
          ...typing,
          id: newId,
          idTelephonyTyping: newId,
        });
        state.errorMessage = null;
      });

      return true;
    },

    updateTypification: (id, updatedTypification) =>
      set((state) => {
        const item = state.typifications.find((t) => t.id === id);
        if (item) Object.assign(item, updatedTypification);
        state.editingTypification = null;
      }),

    toggleActive: (id) =>
      set((state) => {
        const item = state.typifications.find((t) => t.id === id);
        if (item) item.active = !item.active;
      }),

    removeTypification: (id) =>
      set((state) => {
        state.typifications = state.typifications
          .filter((item) => item.id !== id)
          .map((item, index) => ({
            ...item,
            id: String(index + 1),
            idTelephonyTyping: String(index + 1),
          }));
      }),
  }))
);
