import { create } from "zustand";
import { FetchallItemsCart } from "@/service/fetchAllItemsCart";

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

export interface CartItem {
    id: number;
    productId: number;
    productTitle: string;
    productPrice: number;
    productImage: string;
    quantity: number;
}

export interface Cart {
    id: number;
    userIdentifier: string;
    items: CartItem[];
}

interface CartState {
    products: Product[];
    cart: CartItem[];

    loadProducts: () => Promise<void>;
    loadCart: () => Promise<void>;
    addToCart: (product: Product) => void;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    clearCart: () => void;
    total: () => number;
}

const API_BASE = "http://localhost:8080/api/cart";
const USER_ID = "default-user"; // temporário

export const useCartStore = create<CartState>((set, get) => ({
    products: [],
    cart: [],

    loadProducts: async () => {
        const data = await FetchallItemsCart();
        set({ products: data });
    },

    loadCart: async () => {
        try {
            const res = await fetch(`${API_BASE}/${USER_ID}`);
            if (!res.ok) throw new Error("Erro ao carregar carrinho");
            const data: Cart = await res.json();
            set({ cart: data.items || [] });
        } catch (error) {
            console.error("Erro ao buscar carrinho:", error);
            set({ cart: [] });
        }
    },

    addToCart: async (product) => {
        try {
            const res = await fetch(
                `${API_BASE}/${USER_ID}/add?productId=${product.id}&quantity=1`,
                { method: "POST" }
            );

            if (!res.ok) throw new Error("Erro ao adicionar produto no carrinho");

            const updatedCart: Cart = await res.json();
            set({ cart: updatedCart.items || [] });
        } catch (error) {
            console.error("Erro ao adicionar ao carrinho:", error);
        }
    },

    updateQuantity: async (id, quantity) => {
        try {
            const res = await fetch(
                `${API_BASE}/${USER_ID}/update?productId=${id}&quantity=${quantity}`,
                { method: "PUT" }
            );
            if (!res.ok) throw new Error("Erro ao atualizar quantidade");
            const updatedCart: Cart = await res.json();
            set({ cart: updatedCart.items || [] });
        } catch (error) {
            console.error(error);
        }
    },

    removeFromCart: async (id) => {
        try {
            const res = await fetch(
                `${API_BASE}/${USER_ID}/remove?productId=${id}`,
                { method: "DELETE" }
            );
            if (!res.ok) throw new Error("Erro ao remover item");
            const updatedCart: Cart = await res.json();
            set({ cart: updatedCart.items || [] });
        } catch (error) {
            console.error(error);
        }
    },

    clearCart: async () => {
        try {
            const res = await fetch(`${API_BASE}/${USER_ID}/clear`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Erro ao limpar carrinho");
            const updatedCart: Cart = await res.json();
            set({ cart: updatedCart.items || [] });
        } catch (error) {
            console.error(error);
        }
    },

    total: () =>
        get().cart.reduce((sum, item) => sum + item.productPrice * item.quantity, 0),
}));
