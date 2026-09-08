export class CartPage {

    constructor(page){
        this.page = page;
        
        this.backpackProduct = page.locator('[data-test="inventory-item"]')
            .filter({hasText: 'Sauce Labs Backpack'});
        
        this.cartQuantity = page.locator('[data-test="item-quantity"]');
    }
}