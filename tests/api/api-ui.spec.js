import { expect } from "@playwright/test";
import { apiTest as test } from "../../fixtures/apiFixtures";
import { loginData } from "../../test-data/loginData";
import { LoginPage } from '../../pages/LoginPage';

test('API test followed by UI verification', async({apiContext, page})=>{
    const response = await apiContext.get('https://reqres.in/api/users/2');

    expect(response.status()).toBe(200);

    const body = await response.json();

    const userEmail = body.data.email;

    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(loginData.validUser, loginData.validPassword);

    await expect(page).toHaveURL(/inventory/);

    console.log(`Using API email in UI test: ${userEmail}`);
});