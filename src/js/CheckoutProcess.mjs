export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.subtotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }

    calculateItemSummary() {
        const subtotalElement = document.querySelector(
            this.outputSelector + " #subtotal"
        );

        const itemNumElement = document.querySelector(
            this.outputSelector + " #numItems"
        );
        // Number of items in the cart
        itemNumElement.innerText = this.list.length;

        this.subtotal = this.list.reduce((total, item) => total + (parseFloat(item.FinalPrice) * item.quantity), 0);
        summaryElement.innerText = `$${this.subtotal}`;
    }
}