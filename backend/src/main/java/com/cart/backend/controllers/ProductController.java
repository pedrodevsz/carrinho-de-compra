package com.cart.backend.controllers;

import java.util.Arrays;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.cart.backend.dto.ProductDTO;

// buscando itens na fakestoreapi
@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final RestTemplate restTemplate = new RestTemplate();
    private static final String FAKE_STORE_API = "https://fakestoreapi.com/products"; // site para os itens da loja

    @GetMapping
    public List<ProductDTO> getProductsFromFakeApi() {
        ProductDTO[] products = restTemplate.getForObject(FAKE_STORE_API, ProductDTO[].class);
        return Arrays.asList(products);
    }
}
