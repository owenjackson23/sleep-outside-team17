import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

loadHeaderFooter();

const listElement = document.querySelector(".product-list");
const cart = new ShoppingCart(listElement);

cart.init();

listElement.addEventListener("click", (event) => {
    const removeButton = event.target.closest(".cart-card__remove");

    if (!removeButton) {
        return;
    }
    event.preventDefault();
    const index = parseInt(removeButton.dataset.index);
    cart.removeItem(index);
});