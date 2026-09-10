import { expect } from '@playwright/test';
import { apiTest as test } from '../../fixtures/apiFixtures';
import { userIds } from '../../test-data/apiData';

test('GET user returns successfully', async({apiContext})=>{
    const userId = 2;

    const response = await apiContext.get(`https://reqres.in/api/users/${userId}`,
        {
            headers:
            {
                Accept: 'application/json'
            }
        }
    );

    expect(response.status()).toBe(200);

    const headers = response.headers();

    expect(headers).toHaveProperty('content-type');

    expect(headers['content-type']).toContain('application/json');

    const body = await response.json();

    expect(body).toHaveProperty('data');

    expect(body.data).toHaveProperty('id');

    expect(body.data).toHaveProperty('email');

    expect(body.data).toHaveProperty('first_name');

    expect(body.data).toHaveProperty('last_name');

    expect(body.data).toBeInstanceOf(Object);

    expect(typeof body.data.id).toBe('number');

    expect(typeof body.data.email).toBe('string');
    
    expect(typeof body.data.first_name).toBe('string');
    
    expect(typeof body.data.last_name).toBe('string');

    expect(body.data.id).toBe(userId);

    expect(body.data.email).toBe('janet.weaver@reqres.in');
    
    expect(body.data.first_name).toBe('Janet');
    
    expect(body.data.last_name).toBe('Weaver');

});

test('GET non existent user returns 404', async({apiContext})=>{
    const response = await apiContext.get('https://reqres.in/api/users/9999');

    expect(response.status()).toBe(404);

});

test('GET users with page parameter', async({apiContext})=>{
    const startTime = Date.now();

    const response = await apiContext.get('https://reqres.in/api/users',
        {
            params:
            {
                page: 2
            }
        }
    );

    const responseTime = Date.now() - startTime;

    const headers = response.headers();

    expect(headers).toHaveProperty('access-control-allow-origin');

    expect(headers['access-control-allow-origin']).toBe('*');

    expect(responseTime).toBeLessThan(3000);

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.page).toBe(2);

    expect(body).toHaveProperty('per_page');

    expect(body).toHaveProperty('total');

    expect(body).toHaveProperty('total_pages');

    expect(typeof body.page).toBe('number');

    expect(typeof body.per_page).toBe('number');

    expect(typeof body.total).toBe('number');

    expect(typeof body.total_pages).toBe('number');

    expect(body.per_page).toBeGreaterThan(0);

    expect(body.total).toBeGreaterThan(0);

    expect(body.total_pages).toBeGreaterThan(0);

    expect(body.page).toBeLessThanOrEqual(body.total_pages);

    expect(body.data).toBeInstanceOf(Array);

    expect(body.data.length).toBeGreaterThan(0);

    expect(body.data).toHaveLength(body.per_page);

    for(const user of body.data){
        expect(user).toBeInstanceOf(Object);

        expect(user).toHaveProperty('id');

        expect(user).toHaveProperty('email');
        
        expect(user).toHaveProperty('first_name');
        
        expect(user).toHaveProperty('last_name');

        expect(typeof user.id).toBe('number');

        expect(typeof user.email).toBe('string');

        expect(typeof user.first_name).toBe('string');

        expect(typeof user.last_name).toBe('string');

        expect(user.email).toContain('@');

    }
});

test('GET users with out of range page', async({apiContext})=>{
    const response = await apiContext.get('https://reqres.in/api/users',
        {
            params:{
                page: 999
            }
        }
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.data).toBeInstanceOf(Array);

    expect(body.data).toHaveLength(0);
});

for(const userId of userIds){
    test(`GET user ${userId} returns successfully`, async({apiContext})=>{
    const response = await apiContext.get(`https://reqres.in/api/users/${userId}`);
    
    expect(response.status()).toBe(200);
    });
}
