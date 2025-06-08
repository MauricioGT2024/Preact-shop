import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],

      addToCart: (product) => {
        const items = get().cartItems;
        const existing = items.find((item) => item.id === product.id);
        if (existing) {
          const updated = items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
          set({ cartItems: updated });
        } else {
          set({ cartItems: [...items, { ...product, quantity: 1 }] });
        }
      },

      removeFromCart: (id) => {
        set({ cartItems: get().cartItems.filter((item) => item.id !== id) });
      },

      clearCart: () => {
        set({ cartItems: [] });
      },
    }),
    {
      name: "cart-storage", // localStorage key
    }
  )
);
