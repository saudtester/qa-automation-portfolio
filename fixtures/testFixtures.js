import {test as base} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { OverviewPage } from '../pages/OverviewPage';

// Create reusable Page Object Model fixtures for UI tests.
export const test = base.extend({
    loginPage: async({page},use)=>{
        const loginPage = new LoginPage(page);
        
        await use(loginPage);
    },

    productsPage: async({page},use)=>{
        const productsPage = new ProductsPage(page);
        
        await use(productsPage);
    },

    cartPage: async({page},use)=>{
        const cartPage = new CartPage(page);
        await use(cartPage);
    },

    checkoutPage: async({page},use)=>{
        const checkoutPage = new CheckoutPage(page);
        await use(checkoutPage);
    },

    overviewPage: async({page},use)=>{
        const overviewPage = new OverviewPage(page);
        await use(overviewPage);
    }
});