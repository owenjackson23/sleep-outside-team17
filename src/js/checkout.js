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

document.forms.checkout.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("Checking form validity");
  if (event.currentTarget.checkValidity()) {
    order.checkout();
    console.log("Submitting form");
  }
  else {
    event.currentTarget.reportValidity();
    console.log("Form is invalid");
  }
});
