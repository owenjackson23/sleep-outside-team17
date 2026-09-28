import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs"

loadHeaderFooter();

const order = new CheckoutProcess("so-cart", ".checkout-summary");
order.init();

// Blur is when the element goes from focused to not focused
document
    .getElementById(zip)
    .addEventListener("blur", order.calculateOrderTotal.bind(order));

document
    .getElementById(checkoutSubmit)
    .addEventListener("click", (event) => {
        event.preventDefault();
        order.checkout();
    });