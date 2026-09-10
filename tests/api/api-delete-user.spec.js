import { expect } from '@playwright/test';
import { apiTest as test } from '../../fixtures/apiFixtures';

test('DELETE user successfully', async({apiContext})=>{
    const response = await apiContext.delete('https://reqres.in/api/users/2');

    expect(response.status()).toBe(204);
});