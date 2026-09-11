import { test, expect } from '@playwright/test';

import { LoginPage } from '../Pages/LoginPage';
import { ProductsPage } from '../Pages/ProductsPage';
import { CartPage } from '../Pages/CartPage';
import { CheckoutPage } from '../Pages/CheckoutPage';

import {
    loginData,
    productData,
    customerData
} from '../test-data/userData';

test.describe('Checkout Tests', () => {

    let loginPage: LoginPage;
    let productsPage: ProductsPage;
    let cartPage: CartPage;
    let checkoutPage: CheckoutPage;

    test.beforeEach(async ({ page }) => {

        loginPage = new LoginPage(page);
        productsPage = new ProductsPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);

        await loginPage.openLoginPage();

        await loginPage.login(
            loginData.validUser.username,
            loginData.validUser.password
        );
    });

    test('Complete Checkout', async () => {

        // Add product
        await productsPage.addProduct(
            productData.productName
        );

        // Verify cart count
        await expect(productsPage.cartBadge)
            .toHaveText('1');

        // Open cart
        await productsPage.openCart();

        // Verify product
        const product =
            await cartPage.getCartItem(
                productData.productName
            );

        await expect(product)
            .toBeVisible();

        // Checkout
        await cartPage.clickCheckout();

        // Customer information
        await checkoutPage.enterCustomerInformation(
            customerData.firstName,
            customerData.lastName,
            customerData.postalCode
        );

        // Continue
        await checkoutPage.clickContinue();

        // Verify product on overview
        await expect(checkoutPage.summaryItems)
            .toContainText(
                productData.productName
            );

        // Finish
        await checkoutPage.clickFinish();

        // Verify confirmation
        await expect(checkoutPage.confirmationMessage)
            .toHaveText(
                'Thank you for your order!'
            );
    });
});