import { getLocalStorage } from "./utils.mjs";
import { renderListWithTemplate } from "./utils.mjs";

function cartItemTemplate(item) {
    const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

    return newItem;
}

export default class ShoppingCart {
    constructor(listElement) {
        const dataSource = getLocalStorage("so-cart") || [];

        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        this.renderCartContents(this.dataSource);
    }

    renderCartContents(cartContents) {
        let cartTotal = 0.0;

        if (!cartContents || cartContents.length === 0) {
            document.querySelector(".product-list").innerHTML = "<p>Your cart is empty.</p>";
            document.querySelector(".cart-footer").classList.add("hide");
            cartTotal = 0.0;
            return;
        }
        else {
            document.querySelector(".cart-footer").classList.remove("hide");
            cartTotal = cartContents.reduce((total, item) => total + parseFloat(item.FinalPrice), 0);
        }
        renderListWithTemplate(cartItemTemplate, this.listElement, cartContents);

        document.getElementById("cart-total").textContent = `Total: $${cartTotal.toFixed(2)}`;
    }
}