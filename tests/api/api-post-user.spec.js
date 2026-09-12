import { expect } from '@playwright/test';
import { apiTest as test } from '../../fixtures/apiFixtures';

test('POST creates a user', async({apiContext})=>{
    const response = await apiContext.post('https://reqres.in/api/users',
        {
            headers:
            {
                Accept: 'application/json'
            },
            data:
            {
                name: 'Saud',
                job: 'QA Engineer'
            }
        }
    );

    expect(response.status()).toBe(201);

    const body = await response.json();

    expect(body.name).toBe('Saud');

    expect(body.job).toBe('QA Engineer');

    expect(body.id).toBeTruthy();

});

