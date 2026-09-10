import {expect} from '@playwright/test';
import {test} from '../../fixtures/testFixtures';
import {loginData} from '../../test-data/loginData';

test.describe('Login',()=>{

    test('user can login successfully',async({loginPage, page})=>{
        await loginPage.goto();
    
        await loginPage.login(loginData.validUser, loginData.validPassword);
    
        await expect(page).toHaveURL(/inventory/);

    });

    test('user cannot login with invalid username',async({loginPage})=>{
        await loginPage.goto();
    
        await expect(loginPage.errorMessage).toBeHidden();
    
        await loginPage.login(loginData.invalidUser, loginData.validPassword);
    
        await expect(loginPage.errorMessage).toBeVisible();
    
        await expect(loginPage.errorMessage).toContainText('Username and password do not match');
    });

    test('user cannot login with invalid password', async ({ loginPage }) => {
        await loginPage.goto();

        await expect(loginPage.errorMessage).toBeHidden();

        await loginPage.login(loginData.validUser, loginData.invalidPassword);

        await expect(loginPage.errorMessage).toBeVisible();

        await expect(loginPage.errorMessage).toContainText('Username and password do not match');

    });

    test('user cannot login without entering credentials', async ({ loginPage }) => {
        await loginPage.goto();

        await loginPage.login('', '');

        await expect(loginPage.errorMessage).toBeVisible();

        await expect(loginPage.errorMessage).toContainText('Username is required');

    });

    test('user cannot login without entering password', async ({ loginPage }) => {
        await loginPage.goto();

        await loginPage.login(loginData.validUser, '');

        await expect(loginPage.errorMessage).toBeVisible();

        await expect(loginPage.errorMessage).toContainText('Password is required');

    });

});