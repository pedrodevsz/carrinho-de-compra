"use client";

import { ShoppingCart, X, Plus, Minus, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/cartStore/cartStore";
import Image from "next/image";

interface CartModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function CartModal({ isOpen, onClose }: CartModalProps) {
    const { cart, updateQuantity, removeFromCart, clearCart, total } = useCartStore();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-end z-50">
            <div className="w-full max-w-md bg-white h-full p-6 flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <ShoppingCart className="w-6 h-6 text-blue-600" /> Meu Carrinho
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                        <X className="w-5 h-5 text-gray-600" />
                    </button>
                </div>

                {cart.length === 0 ? (
                    <p className="text-gray-500">Seu carrinho está vazio.</p>
                ) : (
                    <div className="flex-1 overflow-y-auto space-y-4">
                        {cart.map((item) => (
                            <div key={item.id} className="flex items-center gap-4 border p-3 rounded-lg shadow-sm">
                                <Image
                                    src={item.productImage}
                                    alt={item.productTitle}
                                    height={50}
                                    width={50}
                                    className="w-14 h-14 object-contain rounded-md border bg-white"
                                />
                                <div className="flex-1">
                                    <h3 className="font-medium text-gray-800 line-clamp-1">{item.productTitle}</h3>
                                    <p className="text-blue-600 font-semibold">
                                        ${(item.productPrice * item.quantity).toFixed(2)}
                                    </p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                        className="p-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="px-2 font-medium">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="p-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="p-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {cart.length > 0 && (
                    <div className="mt-6 border-t pt-4">
                        <p className="text-lg font-bold text-gray-800 mb-3">Total: ${total().toFixed(2)}</p>
                        <button
                            onClick={clearCart}
                            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
                        >
                            Limpar carrinho
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
