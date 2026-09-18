import {expect} from '@playwright/test';
import {test} from '../../../fixtures/testFixtures';
test.describe('Cart', ()=>{

    test('user can view backpack in cart',async({productsPage, cartPage, page})=>{
        await page.goto('/inventory.html');

        await expect(productsPage.productsTitle).toBeVisible();

        await productsPage.addBackpackToCart();

        await productsPage.goToCart();

        await expect(cartPage.backpackProduct).toBeVisible();

        await expect(cartPage.cartQuantity).toHaveText('1');

        await cartPage.proceedToCheckout();

        await expect(page).toHaveURL(/checkout/i);
    });

    test('user can continue shopping from cart',async({productsPage, cartPage, page})=>{
        await page.goto('/inventory.html');

        await productsPage.addBackpackToCart();

        await productsPage.goToCart();

        await cartPage.continueShopping();

        await expect(page).toHaveURL(/inventory/i);

        await expect(productsPage.productsTitle).toBeVisible();
    });

    test('user can remove backpack from cart', async({productsPage, cartPage, page})=>{
        await page.goto('/inventory.html');

        await productsPage.addBackpackToCart();

        await productsPage.goToCart();

        await expect(cartPage.cartQuantity).toHaveText('1');

        await cartPage.removeBackpackFromCart();

        await expect(cartPage.backpackProduct).not.toBeVisible();

        await expect(cartPage.cartQuantity).not.toBeVisible();
    });
});