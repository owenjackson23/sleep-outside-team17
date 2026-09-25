import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

loadHeaderFooter();

const listElement = document.querySelector(".product-list");
const cart = new ShoppingCart(listElement);

cart.init();

// let cartTotal = 0.0;

// function renderCartContents() {
//   const cartItems = getLocalStorage("so-cart");
//   if (!cartItems || cartItems.length === 0) {
//     document.querySelector(".product-list").innerHTML = "<p>Your cart is empty.</p>";
//     document.querySelector(".cart-footer").classList.add("hide");
//     cartTotal = 0.0;
//     return;
//   }
//   else {
//     document.querySelector(".cart-footer").classList.remove("hide");
//     cartTotal = cartItems.reduce((total, item) => total + parseFloat(item.FinalPrice), 0);
//   }
//   const htmlItems = cartItems.map((item) => cartItemTemplate(item));
//   document.querySelector(".product-list").innerHTML = htmlItems.join("");
//   document.getElementById("cart-total").textContent = `Total: $${cartTotal.toFixed(2)}`;
// }

// function cartItemTemplate(item) {
//   const newItem = `<li class="cart-card divider">
//   <a href="#" class="cart-card__image">
//     <img
//       src="${item.Image}"
//       alt="${item.Name}"
//     />
//   </a>
//   <a href="#">
//     <h2 class="card__name">${item.Name}</h2>
//   </a>
//   <p class="cart-card__color">${item.Colors[0].ColorName}</p>
//   <p class="cart-card__quantity">qty: 1</p>
//   <p class="cart-card__price">$${item.FinalPrice}</p>
// </li>`;

//   return newItem;
// }

// renderCartContents();
