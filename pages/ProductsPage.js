export class ProductsPage {
    constructor(page) {
        this.page = page;
        
        this.productsTitle = page.getByText('Products');
        
        this.backpackProduct = page.getByText('Sauce Labs Backpack');
        
        this.backpackAddToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');

        this.bikeLightAddToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
        
        this.cartLink = page.locator('[data-test="shopping-cart-link"]');

    }

    async addBackpackToCart() {
        await this.backpackAddToCartButton.click();
    }

    async addBikeLightToCart() {
        await this.bikeLightAddToCartButton.click();
    }

    async goToCart() {
        await this.cartLink.click();
    }
} 

