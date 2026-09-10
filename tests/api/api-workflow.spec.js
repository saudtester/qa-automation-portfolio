import { expect } from '@playwright/test';
import { apiTest as test } from '../../fixtures/apiFixtures';

test('create and update user', async({apiContext})=>{
    const createResponse = await apiContext.post('https://reqres.in/api/users',
        {
            data:
            {
                name: 'Saud',
                job: 'QA Engineer'
            }
        }
    );

    const createBody = await createResponse.json();

    const userId = createBody.id;

    const updateResponse = await apiContext.put(`https://reqres.in/api/users/${userId}`,
        {
            data:
            {
                name: 'Saud Malik',
                job: 'Senior QA Engineer'
            }
        }
    );

    expect(updateResponse.status()).toBe(200);
});
