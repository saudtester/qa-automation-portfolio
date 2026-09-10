import {request} from '@playwright/test';

export async function createApiContext() {
    return await request.newContext({
        extraHTTPHeaders:{
            'x-api-key': process.env.REQRES_API_KEY
        }
    });
}