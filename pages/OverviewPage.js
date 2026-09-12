export class OverviewPage{
    constructor(page) {
        this.page = page;

        this.overviewTitle = page.getByText('Checkout: Overview');
        
        this.backpackProduct = page.locator('[data-test="inventory-item-name"]')
            .filter({hasText: 'Sauce Labs Backpack'});

        this.backpackQuantity = page.locator('[data-test="item-quantity"]');

        this.backpackPrice = page.locator('[data-test="inventory-item-price"]');

        this.itemTotal = page.locator('[data-test="subtotal-label"]');

        this.tax = page.locator('[data-test="tax-label"]');

        this.total = page.locator('[data-test="total-label"]');

        this.finishButton = page.getByRole('button', { name: 'Finish' });

        this.successMessage = page.locator('[data-test="complete-header"]');
    }

    async finishCheckout() {
        await this.finishButton.click();
    }
}