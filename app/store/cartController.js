import { create } from "zustand"

const useCartStore = create((set) => ({
  cartIds: [],
  setCartIds: (id) =>
    set((state) => ({
      cartIds: [...state.cartIds, id],
    })),
  removeProduct: (id) =>
    set((state) => ({
      cartIds: [...state.cartIds.filter((item) => item !== id)]
    })),
  removeLastId: (id) =>
    set((state) => {
      const cartIds = [...state.cartIds];
      const occurrences = cartIds.filter((item) => item === id).length; // Count occurrences

      if (occurrences > 1) {
        const index = cartIds.lastIndexOf(id);
        if (index !== -1) {
          cartIds.splice(index, 1);
        }
      }

      return { cartIds };
    }),
}));

export default useCartStore