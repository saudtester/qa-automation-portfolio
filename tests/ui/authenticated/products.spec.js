import {expect} from '@playwright/test';
import {test} from '../../../fixtures/testFixtures';

test.describe('Products',()=>{

    test('user can add backpack to cart', 
        { tag: ['@smoke' , '@regression'] }, async({productsPage, page})=>{
        await page.goto('https://www.saucedemo.com/inventory.html');
        
        await expect(productsPage.productsTitle).toBeVisible();

        await productsPage.addBackpackToCart();

        await expect(productsPage.cartLink).toHaveText('1');

    });

    test('cart count updates when multiple products are added', 
        { tag: '@regression' }, async({productsPage, page})=>{
        await page.goto('https://www.saucedemo.com/inventory.html');

        await productsPage.addBackpackToCart();

        await expect (productsPage.cartLink).toHaveText('1');

        await productsPage.addBikeLightToCart();

        await expect(productsPage.cartLink).toHaveText('2');
    });
});