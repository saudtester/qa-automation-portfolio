import { expect } from '@playwright/test';
import { apiTest as test } from '../../fixtures/apiFixtures';
import Ajv from 'ajv';
import { userSchema } from '../../schemas/userSchema';

test('GET user response matches schema', async({apiContext})=>{
    const ajv = new Ajv();

    const validate = ajv.compile(userSchema);

    const response = await apiContext.get('https://reqres.in/api/users/2');

    const body = await response.json();

    // Validate the API response against the defined user schema.
    const isValid = validate(body.data);

    expect(isValid, JSON.stringify(validate.errors)).toBe(true);
});