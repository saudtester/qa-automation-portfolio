import {expect} from '@playwright/test';
import {test} from '../../fixtures/testFixtures';
import { loginData } from '../../test-data/loginData';

test.describe('Checkout',()=>{

    test('user can complete checkout successfully',async({loginPage, productsPage, cartPage, checkoutPage, 
    overviewPage, page})=>{
        await loginPage.goto();

        await loginPage.login(loginData.validUser, loginData.validPassword);

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
});