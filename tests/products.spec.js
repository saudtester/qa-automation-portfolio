import {expect} from '@playwright/test';
import {test} from '../fixtures/testFixtures';
import { loginData } from '../test-data/loginData';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';

test('user can add backpack to cart', async({loginPage,page})=>{
    await loginPage.goto();
    
    await loginPage.login(loginData.validUser,loginData.validPassword);

    const productsPage = new ProductsPage(page);

    await expect(productsPage.productsTitle).toBeVisible();

    await productsPage.addBackpackToCart();

    await productsPage.goToCart();

    const cartPage = new CartPage(page);

    await expect(cartPage.backpackProduct).toBeVisible();

    await expect(cartPage.cartQuantity).toHaveText('1');

});