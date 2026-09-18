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

    const headers = response.headers();

    expect(headers).toHaveProperty('content-type');

    expect(headers['content-type']).toContain('application/json');

    const body = await response.json();

    expect(body).toHaveProperty('name');
    
    expect(body).toHaveProperty('job');
    
    expect(body).toHaveProperty('id');
    
    expect(body).toHaveProperty('createdAt');

    expect(body.name).toBe('Saud');

    expect(body.job).toBe('QA Engineer');

    expect (typeof body.id).toBe('string');

    expect(body.id).not.toBe('');

    expect (typeof body.createdAt).toBe('string');

    expect(body.createdAt).not.toBe('');

});

test('POST login fails without password', 
    {tag: '@regression'}, async({apiContext})=>{
    const response = await apiContext.post('https://reqres.in/api/login',
        {
            data:
            {
                email: 'abdcddf@fsdfjk.com'
            }
        }
    );

    expect(response.status()).toBe(400);

    const body = await response.json();

    expect(body).toHaveProperty('error');

    expect(body.error).toBe('Missing password');

});
