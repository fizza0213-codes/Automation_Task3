import { test, expect } from '@playwright/test';

import { LoginPage } from '../Pages/LoginPage';
import { ProductsPage } from '../Pages/ProductsPage';
import { CartPage } from '../Pages/CartPage';

import {
    loginData,
    productData
} from '../test-data/userData';

test.describe('Cart Tests', () => {

    
    let loginPage: LoginPage;
    let productsPage: ProductsPage;
    let cartPage: CartPage;

    test.beforeEach(async ({ page }) => {

        loginPage = new LoginPage(page);
        productsPage = new ProductsPage(page);
        cartPage = new CartPage(page);

        await loginPage.openLoginPage();

        await loginPage.login(
            loginData.validUser.username,
            loginData.validUser.password
        );
    });

    test('Add Product to Cart', async () => {

        await productsPage.addProduct(
            productData.productName
        );

        await expect(productsPage.cartBadge)
            .toHaveText('1');

        await productsPage.openCart();

        const product =
            await cartPage.getCartItem(
                productData.productName
            );

        await expect(product)
            .toBeVisible();
    });

    test('Remove Product from Cart', async () => {

        await productsPage.addProduct(
            productData.productName
        );

        await productsPage.openCart();

        const product =
            await cartPage.getCartItem(
                productData.productName
            );

        await expect(product)
            .toBeVisible();

        await cartPage.removeProduct(
            productData.productName
        );

        await expect(product)
            .not.toBeVisible();
    });
});