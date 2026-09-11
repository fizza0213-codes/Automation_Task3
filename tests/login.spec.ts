import { test, expect } from '@playwright/test';

import { LoginPage } from '../Pages/LoginPage';
import { ProductsPage } from '../Pages/ProductsPage';

import { loginData } from '../test-data/userData';

test.describe('Login Tests', () => {

    let loginPage: LoginPage;
    let productsPage: ProductsPage;

    test.beforeEach(async ({ page }) => {

        loginPage = new LoginPage(page);
        productsPage = new ProductsPage(page);

        await loginPage.openLoginPage();
    });

    test('Valid Login', async () => {

        await loginPage.login(
            loginData.validUser.username,
            loginData.validUser.password
        );

        await expect(productsPage.productTitle)
            .toBeVisible();

        await expect(productsPage.productTitle)
            .toHaveText('Products');
    });

    test('Invalid Login', async ({ page }) => {

        await loginPage.login(
            loginData.invalidUser.username,
            loginData.invalidUser.password
        );

        await expect(loginPage.errorMessage)
            .toBeVisible();

        await expect(page)
            .toHaveURL('https://www.saucedemo.com/');
    });
});