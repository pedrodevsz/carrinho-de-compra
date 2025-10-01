package com.cart.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cart.backend.entities.CartItem;

public interface CartItemRepository extends  JpaRepository<CartItem, Long> {
    
}
