export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    init() { }

    addProductToCart(product) {
        // Get the current cart from local storage
        const currentCart = getLocalStorage("so-cart") || [];
        // Add the product to the current cart
        currentCart.push(product);
        // Update local storage with the new cart
        setLocalStorage("so-cart", currentCart);
    }

    renderProductDetails() { }
}