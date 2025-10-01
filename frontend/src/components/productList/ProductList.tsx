"use client";

import { Loader2, Plus, Minus } from "lucide-react";
import { useCartStore } from "@/store/cartStore/cartStore";
import { useEffect, useState } from "react";

export function ProductList() {
    const { products, cart, loadProducts, addToCart, updateQuantity } = useCartStore();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            await loadProducts();
            setLoading(false);
        };
        load();
    }, [loadProducts]);

    return loading ? (
        <div className="flex items-center justify-center py-10 text-gray-500">
            <Loader2 className="animate-spin w-6 h-6 mr-2" /> Carregando produtos...
        </div>
    ) : (
        <ul className="grid grid-cols-2 gap-4">
            {products.map((p) => {
                const inCart = cart.find((item) => item.id === p.id);
                return (
                    <li key={p.id} className="flex flex-col border p-4 rounded-2xl shadow-sm hover:shadow-md transition">
                        <img src={p.image} alt={p.title} className="w-24 h-24 object-contain mx-auto mb-3" />
                        <h3 className="font-medium text-gray-800 line-clamp-1">{p.title}</h3>
                        <p className="text-blue-600 font-semibold">${p.price}</p>

                        {!inCart ? (
                            <button
                                onClick={async () => await addToCart(p)}
                                className="mt-2 bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition"
                            >
                                Adicionar
                            </button>

                        ) : (
                            <div className="flex items-center justify-center gap-2 mt-3">
                                <button
                                    onClick={() => updateQuantity(p.id, Math.max(1, inCart.quantity - 1))}
                                    className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="px-2 font-medium">{inCart.quantity}</span>
                                <button
                                    onClick={() => updateQuantity(p.id, inCart.quantity + 1)}
                                    className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </li>
                );
            })}
        </ul>
    );
}
