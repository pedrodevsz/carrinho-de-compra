package com.cart.backend.controllers;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cart.backend.dto.CartDTO;
import com.cart.backend.service.CartService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    // Buscar carrinho do usuário
    @GetMapping("/{userId}")
    public CartDTO getCart(@PathVariable String userId) {
        return CartDTO.fromEntity(cartService.getOrCreateCart(userId));
    }

    // Adicionar produto
    @PostMapping("/{userId}/add")
    public CartDTO addToCart(
            @PathVariable String userId,
            @RequestParam Long productId,
            @RequestParam int quantity
    ) {
        return cartService.addProductToCart(userId, productId, quantity);
    }

    // Atualizar quantidade
    @PutMapping("/{userId}/update")
    public CartDTO updateQuantity(
            @PathVariable String userId,
            @RequestParam Long productId,
            @RequestParam int quantity
    ) {
        return cartService.updateQuantity(userId, productId, quantity);
    }

    // Remover item
    @DeleteMapping("/{userId}/remove")
    public CartDTO removeFromCart(
            @PathVariable String userId,
            @RequestParam Long productId
    ) {
        return cartService.removeProduct(userId, productId);
    }

    // Limpar carrinho
    @DeleteMapping("/{userId}/clear")
    public CartDTO clearCart(@PathVariable String userId) {
        return cartService.clearCart(userId);
    }
}
