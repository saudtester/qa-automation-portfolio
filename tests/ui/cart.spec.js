import {expect} from '@playwright/test';
import {test} from '../../fixtures/testFixtures';
import { loginData } from '../../test-data/loginData';

test.describe('Cart', ()=>{

    test('user can view backpack in cart',async({loginPage, productsPage, cartPage, page})=>{
        await loginPage.goto();
    
        await loginPage.login(loginData.validUser, loginData.validPassword);

        await expect(productsPage.productsTitle).toBeVisible();

        await productsPage.addBackpackToCart();

        await productsPage.goToCart();

        await expect(cartPage.backpackProduct).toBeVisible();

        await expect(cartPage.cartQuantity).toHaveText('1');

        await cartPage.proceedToCheckout();

        await expect(page).toHaveURL(/checkout/i);
    });

    test('user can continue shopping from cart',async({loginPage, productsPage, cartPage, page})=>{
        await loginPage.goto();

        await loginPage.login(loginData.validUser, loginData.validPassword);

        await productsPage.addBackpackToCart();

        await productsPage.goToCart();

        await cartPage.continueShopping();

        await expect(page).toHaveURL(/inventory/i);

        await expect(productsPage.productsTitle).toBeVisible();
    });
});