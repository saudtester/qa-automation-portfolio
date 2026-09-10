import { expect } from '@playwright/test';
import { apiTest as test } from '../../fixtures/apiFixtures';

test('PUT updates a user', async({apiContext})=>{
    const response = await apiContext.put('https://reqres.in/api/users/2',
    {
        data:
        {
           name: 'Saud Malik',
           job: 'Senior QA Engineer' 
        }
    }
   );

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.name).toBe('Saud Malik');

    expect(body.job).toBe('Senior QA Engineer');

});

test('PATCH updates part of a user', async({apiContext})=>{
    const response = await apiContext.patch('https://reqres.in/api/users/2',
        {
            data:
            {
                job: 'Principal QA Engineer'
            }
        }
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.job).toBe('Principal QA Engineer');
});
