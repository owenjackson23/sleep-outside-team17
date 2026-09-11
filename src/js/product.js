import { setLocalStorage, getLocalStorage, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");
const productId = getParam('product');

console.log(dataSource.findProductById(productId));

function addProductToCart(product) {
  // Get the current cart from local storage
  const currentCart = getLocalStorage("so-cart") || [];
  // Add the product to the current cart
  currentCart.push(product);
  // Update local storage with the new cart
  setLocalStorage("so-cart", currentCart);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
