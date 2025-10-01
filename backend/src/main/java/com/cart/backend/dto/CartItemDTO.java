package com.cart.backend.dto;

import com.cart.backend.entities.CartItem;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartItemDTO {
    private Long id;
    private Long productId;
    private String productTitle;
    private Double productPrice;
    private String productImage;
    private int quantity;

    public static CartItemDTO fromEntity(CartItem item) {
        return new CartItemDTO(
                item.getId(),
                item.getProductId(),
                item.getProductTitle(),
                item.getProductPrice(),
                item.getProductImage(),
                item.getQuantity()
        );
    }
}
