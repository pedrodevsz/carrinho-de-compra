package com.cart.backend.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.cart.backend.entities.Cart;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartDTO {
    private Long id;
    private String userIdentifier;
    private List<CartItemDTO> items;

    public static CartDTO fromEntity(Cart cart) {
        return new CartDTO(
                cart.getId(),
                cart.getUserIdentifier(),
                cart.getItems().stream()
                        .map(CartItemDTO::fromEntity)
                        .collect(Collectors.toList())
        );
    }
}
