export class CartPage {

    constructor(page){
        this.page = page;
        
        this.backpackProduct = page.locator('[data-test="inventory-item"]')
            .filter({hasText: 'Sauce Labs Backpack'});
        
        this.cartQuantity = page.locator('[data-test="item-quantity"]');

        this.checkoutButton = page.getByRole('button',{name:'Checkout'});

        this.continueShoppingButton = page.getByRole('button',{name:'Continue Shopping'});
    }

    async proceedToCheckout(){
        await this.checkoutButton.click();
    }

    async continueShopping() {
    await this.continueShoppingButton.click();
    }
}