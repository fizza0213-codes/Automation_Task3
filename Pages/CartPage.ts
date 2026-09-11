import { Page, Locator } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly cartItems: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.cartItems = page.locator('.cart_item');
        this.checkoutButton = page.locator('#checkout');
    }

    async getCartItem(productName: string) {
        return this.page
            .locator('.cart_item')
            .filter({ hasText: productName });
    }

    async removeProduct(productName: string) {
        const product = this.page
            .locator('.cart_item')
            .filter({ hasText: productName });

        await product
            .getByRole('button', { name: /Remove/i })
            .click();
    }

    async clickCheckout() {
        await this.checkoutButton.click();
    }
}