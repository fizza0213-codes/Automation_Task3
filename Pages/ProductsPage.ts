import { Page, Locator } from '@playwright/test';

export class ProductsPage {
    readonly page: Page;
    readonly productTitle: Locator;
    readonly cartIcon: Locator;
    readonly cartBadge: Locator;

    constructor(page: Page) {
        this.page = page;

        this.productTitle = page.locator('.title');
        this.cartIcon = page.locator('.shopping_cart_link');
        this.cartBadge = page.locator('.shopping_cart_badge');
    }

    async addProduct(productName: string) {
        const product = this.page
            .locator('.inventory_item')
            .filter({ hasText: productName });

        await product
            .getByRole('button', { name: 'Add to cart' })
            .click();
    }

    async openCart() {
        await this.cartIcon.click();
    }
}