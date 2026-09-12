import {request} from '@playwright/test';

// Create a reusable API context with authentication from an environment variable.
export async function createApiContext() {
    return await request.newContext({
        extraHTTPHeaders:{
            'x-api-key': process.env.REQRES_API_KEY
        }
    });
}