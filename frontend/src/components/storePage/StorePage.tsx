"use client";

import { useState } from "react";
import { ShoppingCart, StarHalfIcon, StarIcon } from "lucide-react";
import { ProductList } from "@/components/productList/ProductList";
import { CartModal } from "@/components/cartModal/CartModal";
import { useCartStore } from "@/store/cartStore/cartStore";

export default function StorePage() {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { cart } = useCartStore();

    return (
        <div className="p-6 max-w-5xl mx-auto relative">
            <div className="flex items-center justify-between mb-6">
                <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-800">
                    <StarIcon />  Carrinho Tik tok
                </h1>
                <button
                    onClick={() => setIsCartOpen(true)}
                    className="relative bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                >
                    <ShoppingCart className="w-5 h-5" /> Ver Carrinho
                    {cart.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {cart.length}
                        </span>
                    )}
                </button>
            </div>

            <ProductList />
            <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </div>
    );
}
