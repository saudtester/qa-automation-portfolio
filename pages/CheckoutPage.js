export class CheckoutPage{
    constructor(page) {
        this.page = page;
        
        this.firstName = page.getByPlaceholder('First Name');
        
        this.lastName = page.getByPlaceholder('Last Name');

        this.postalCode = page.getByPlaceholder('Zip/Postal Code');

        this.continueButton = page.getByRole('button', { name: 'Continue'});

        this.firstNameError = page.getByText('Error: First Name is required');

        this.lastNameError = page.getByText('Error: Last Name is required');

        this.postalCodeError = page.getByText('Error: Postal Code is required');
    }

    async fillCustomerInformation(firstName, lastName, postalCode) {
        await this.firstName.fill(firstName);

        await this.lastName.fill(lastName);

        await this.postalCode.fill(postalCode);
    }

    async continueToOverview() {
        await this.continueButton.click();
    }
}