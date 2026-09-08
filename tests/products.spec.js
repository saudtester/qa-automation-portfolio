import {expect} from '@playwright/test';
import {test} from '../fixtures/testFixtures';
import { loginData } from '../test-data/loginData';


test('user can add backpack to cart', async({loginPage, productsPage})=>{
    await loginPage.goto();
    
    await loginPage.login(loginData.validUser,loginData.validPassword);

    await expect(productsPage.productsTitle).toBeVisible();

    await productsPage.addBackpackToCart();

    await expect(productsPage.cartLink).toHaveText('1');

});