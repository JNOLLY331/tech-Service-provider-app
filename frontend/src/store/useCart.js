import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import toast from 'react-hot-toast';

export const useCart = create(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product) => {
        const currentCart = get().cart;
        const existingItem = currentCart.find((item) => item.id === product.id);

        if (existingItem) {
          // 🛡️ STOCK GUARD: Prevent adding more than available in Django DB
          if (existingItem.quantity >= product.stock) {
            toast.error("maximum shopping limit");
            return;
          }

          const updatedCart = currentCart.map((item) =>
            item.id === product.id 
              ? { ...item, quantity: item.quantity + 1 } 
              : item
          );
          set({ cart: updatedCart });
        } else {
          // Double check if product even has stock before adding first one
          if (product.stock > 0) {
            set({ cart: [...currentCart, { ...product, quantity: 1 }] });
          } else {
            toast.error("OUT OF STOCK");
          }
        }
      },

      removeFromCart: (productId) => {
        set({ cart: get().cart.filter((item) => item.id !== productId) });
      },

      updateQuantity: (productId, newQuantity) => {
        const item = get().cart.find(i => i.id === productId);
        
        // 🛡️ STOCK GUARD for manual quantity updates
        if (item && newQuantity > item.stock) {
          toast.error(`ONLY ${item.stock} UNITS AVAILABLE`);
          return;
        }

        if (newQuantity < 1) return;
        const updatedCart = get().cart.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        );
        set({ cart: updatedCart });
      },

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'jnolly-cart-storage',
    }
  )
);