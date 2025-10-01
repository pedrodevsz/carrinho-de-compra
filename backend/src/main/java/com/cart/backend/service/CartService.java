package com.cart.backend.service;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.cart.backend.dto.CartDTO;
import com.cart.backend.dto.ProductDTO;
import com.cart.backend.entities.Cart;
import com.cart.backend.entities.CartItem;
import com.cart.backend.repositories.CartItemRepository;
import com.cart.backend.repositories.CartRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;

    private static final String FAKE_STORE_API = "https://fakestoreapi.com/products";
    private final RestTemplate restTemplate = new RestTemplate();

    @Transactional
    public Cart getOrCreateCart(String userIdentifier) {
        return cartRepository.findByUserIdentifier(userIdentifier)
                .orElseGet(() -> {
                    Cart newCart = Cart.builder()
                            .userIdentifier(userIdentifier)
                            .build();
                    return cartRepository.save(newCart);
                });
    }

    // Buscar produto na FakeStore API
    private ProductDTO findProductById(Long productId) {
        ProductDTO[] products = restTemplate.getForObject(FAKE_STORE_API, ProductDTO[].class);
        if (products != null) {
            for (ProductDTO p : products) {
                if (p.getId().equals(productId)) {
                    return p;
                }
            }
        }
        throw new RuntimeException("Produto não encontrado na FakeStore API");
    }

    // Adicionar produto ao carrinho
    @Transactional
    public CartDTO addProductToCart(String userIdentifier, Long productId, int quantity) {
        Cart cart = getOrCreateCart(userIdentifier);

        // Buscar produto da FakeStore API
        ProductDTO product = findProductById(productId);

        // Verifica se o produto já existe no carrinho
        Optional<CartItem> existingItem = cart.getItems().stream()
                .filter(item -> item.getProductId().equals(productId))
                .findFirst();

        if (existingItem.isPresent()) {
            CartItem item = existingItem.get();
            item.setQuantity(item.getQuantity() + quantity);
            cartItemRepository.save(item);
        } else {
            CartItem newItem = CartItem.builder()
                    .cart(cart)
                    .productId(product.getId())
                    .productTitle(product.getTitle())
                    .productPrice(product.getPrice())
                    .productImage(product.getImage())
                    .quantity(quantity)
                    .build();
            cartItemRepository.save(newItem);
            cart.getItems().add(newItem);
        }

        Cart saved = cartRepository.save(cart);
        return CartDTO.fromEntity(saved);
    }

    // Atualizar quantidade
    @Transactional
    public CartDTO updateQuantity(String userIdentifier, Long productId, int quantity) {
        Cart cart = getOrCreateCart(userIdentifier);

        cart.getItems().stream()
                .filter(item -> item.getProductId().equals(productId))
                .findFirst()
                .ifPresent(item -> {
                    item.setQuantity(quantity);
                    cartItemRepository.save(item);
                });

        return CartDTO.fromEntity(cartRepository.save(cart));
    }

    // Remover item do carrinho
    @Transactional
    public CartDTO removeProduct(String userIdentifier, Long productId) {
        Cart cart = getOrCreateCart(userIdentifier);

        cart.getItems().removeIf(item -> {
            if (item.getProductId().equals(productId)) {
                cartItemRepository.delete(item);
                return true;
            }
            return false;
        });

        return CartDTO.fromEntity(cartRepository.save(cart));
    }

    // Limpar carrinho
    @Transactional
    public CartDTO clearCart(String userIdentifier) {
        Cart cart = getOrCreateCart(userIdentifier);
        cartItemRepository.deleteAll(cart.getItems());
        cart.getItems().clear();
        return CartDTO.fromEntity(cartRepository.save(cart));
    }

    // Calcular total
    public double calculateTotal(String userIdentifier) {
        Cart cart = getOrCreateCart(userIdentifier);
        return cart.getItems().stream()
                .mapToDouble(item -> item.getProductPrice() * item.getQuantity())
                .sum();
    }
}
