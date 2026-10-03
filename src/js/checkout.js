import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const order = new CheckoutProcess("so-cart", ".checkout-summary");
order.init();
order.calculateOrderTotal();

// Blur is when the element goes from focused to not focused
document
  .getElementById("zip")
  .addEventListener("blur", order.calculateOrderTotal.bind(order));

document.forms.order.addEventListener("submit", (event) => {
  event.preventDefault();
  if (event.currentTarget.checkValidity()) {
    order.checkout();
  }
  else {
    event.currentTarget.reportValidity();
  }
});
