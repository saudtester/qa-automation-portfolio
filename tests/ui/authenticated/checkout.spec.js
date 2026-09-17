import {expect} from '@playwright/test';
import {test} from '../../../fixtures/testFixtures';

test.describe('Checkout',()=>{

    test('user can complete checkout successfully',async({productsPage, cartPage, checkoutPage, 
    overviewPage, page})=>{
        await page.goto('https://www.saucedemo.com/inventory.html');
        
        await expect(productsPage.productsTitle).toBeVisible();

        await productsPage.addBackpackToCart();

        await productsPage.goToCart();

        await cartPage.proceedToCheckout();

        await expect(page).toHaveURL(/checkout/i);

        await checkoutPage.fillCustomerInformation('Saud', 'Malik', '52250');

        await checkoutPage.continueToOverview();

        await expect(overviewPage.overviewTitle).toBeVisible();

        await expect(overviewPage.backpackProduct).toBeVisible();

        await expect(overviewPage.backpackQuantity).toHaveText('1');

        await expect(overviewPage.backpackPrice).toHaveText('$29.99');

        await expect(overviewPage.itemTotal).toHaveText('Item total: $29.99');

        await expect(overviewPage.tax).toHaveText('Tax: $2.40');

        await expect(overviewPage.total).toHaveText('Total: $32.39');

        await overviewPage.finishCheckout();

        await expect(page).toHaveURL(/complete/i);

        await expect(overviewPage.successMessage).toHaveText('Thank you for your order!');
    });

    test('user cannot continue checkout without first name', async({productsPage, cartPage,
        checkoutPage, page})=>{
        await page.goto('https://www.saucedemo.com/inventory.html');
        
        await expect(productsPage.productsTitle).toBeVisible();

        await productsPage.addBackpackToCart();

        await productsPage.goToCart();

        await cartPage.proceedToCheckout();

        await expect(page).toHaveURL(/checkout/i);

        await expect(checkoutPage.firstNameError).toBeHidden();

        await checkoutPage.continueToOverview();

        await expect(checkoutPage.firstNameError).toBeVisible();

    });

    test('user cannot continue checkout without last name', async({productsPage, cartPage,
        checkoutPage, page})=>{
        await page.goto('https://www.saucedemo.com/inventory.html');
        
        await expect(productsPage.productsTitle).toBeVisible();

        await productsPage.addBackpackToCart();

        await productsPage.goToCart();

        await cartPage.proceedToCheckout();

        await expect(page).toHaveURL(/checkout/i);
        
        await checkoutPage.firstName.fill('Saud');

        await expect(checkoutPage.lastNameError).toBeHidden();

        await checkoutPage.continueToOverview();

        await expect(checkoutPage.lastNameError).toBeVisible();
    });

    test('user cannot continue checkout without postal code', async({productsPage,cartPage,
    checkoutPage,page})=>{
    await page.goto('https://www.saucedemo.com/inventory.html');

    await expect(productsPage.productsTitle).toBeVisible();

    await productsPage.addBackpackToCart();

    await productsPage.goToCart();

    await cartPage.proceedToCheckout();

    await expect(page).toHaveURL(/checkout/i);

    await checkoutPage.firstName.fill('Saud');

    await checkoutPage.lastName.fill('Malik');

    await expect(checkoutPage.postalCodeError).toBeHidden();

    await checkoutPage.continueToOverview();

    await expect(checkoutPage.postalCodeError).toBeVisible();
    });
});