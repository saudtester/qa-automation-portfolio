import {test as base} from '@playwright/test';
import { createApiContext } from '../api/apiClient';

export const apiTest = base.extend({
    apiContext: async({}, use)=>{
        const apiContext = await createApiContext();

        await use(apiContext);
        
        // Dispose of the API context after the test to release resources.
        await apiContext.dispose();

    }
});