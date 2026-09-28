import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const exServices = new ExternalServices();

function packageItems(items) {
    const packagedItems = items.map((item) => {
        return {
            id: item.Id,
            name: item.Name,
            price: item.FinalPrice,
            quantity: item.quantity,
        };
    });
    return packagedItems;
}

function formDataToJSON(formElement) {
    const formData = new FormData(formElement);
    const convertedJSON = {};

    formData.forEach(function (value, key) {
        convertedJSON[key] = value;
    });

    return convertedJSON;
}

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

    init() {
        this.list = getLocalStorage(this.key);
        this.calculateItemSummary();
    }

    calculateItemSummary() {
        const subtotalElement = document.querySelector(
            `${this.outputSelector} #subtotal`
        );

        const itemNumElement = document.querySelector(
            `${this.outputSelector} #numItems`
        );
        // Number of items in the cart
        itemNumElement.innerText = this.list.length;

        this.subtotal = this.list.reduce((total, item) => total + (parseFloat(item.FinalPrice) * item.quantity), 0);
        subtotalElement.innerText = `$${this.subtotal}`;
    }

    calculateOrderTotal() {
        // Tax at 6%
        this.tax = (this.subtotal * 0.06);

        // First item is $10, additional items $2
        this.shipping = 10 + (this.list.length - 1) * 2;

        // Total
        this.orderTotal = (
            parseFloat(this.subtotal) +
            parseFloat(this.tax) +
            parseFloat(this.shipping)
        )

        // Display
        this.displayTotals();
    }

    displayOrderTotals() {
        const tax = document.querySelector(
            `${this.outputSelector} #tax`
        );
        const shipping = document.querySelector(
            `${this.outputSelector} #shippingCost`
        );
        const orderTotal = document.querySelector(
            `${this.outputSelector} #orderTotal`
        );

        // Displays totals to 2 decimal places
        tax.innerText = `$${this.tax.toFixed(2)}`;
        shipping.innerText = `$${this.shipping.toFixed(2)}`;
        orderTotal.innerText = `$${this.orderTotal.toFixed(2)}`;
    }

    async checkout() {
        const formElement = document.forms["checkout"];
        const order = formDataToJSON(formElement);

        order.orderDate = new Date().toISOString();
        order.orderTotal = this.orderTotal;
        order.tax = this.tax;
        order.shipping = this.shipping;
        order.items = packageItems(this.list);

        try {
            const response = await exServices.checkout(order);
            console.log(response);
        }
        catch (error) {
            console.log(error);
        }
    }
}