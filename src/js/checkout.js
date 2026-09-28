import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs"

loadHeaderFooter();

const order = new CheckoutProcess("so-cart", ".checkout-summary");
order.init();

document
    .getElementById(zip)
    // Blur is when the element goes from focused to not focused
    .addEventListener("blur", order.calculateOrderTotal.bind(order));

document
    .getElementById(checkoutSubmit)
    .addEventListener("click", (event) => {
        event.preventDefault();
        order.checkout();
    })