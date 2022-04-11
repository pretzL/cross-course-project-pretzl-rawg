export function getExistingCart() {
  const cart = localStorage.getItem("cart");

  if (!cart) {
    return [];
  } else {
    return JSON.parse(cart);
  }
}

function cartChecker() {
  const cart = localStorage.getItem("cart");
  if (!cart) {
    const currentCart = getExistingCart();
    saveCart(currentCart);
  }
}

function saveCart(cartItem) {
  localStorage.setItem("cart", JSON.stringify(cartItem));
  cartItemsLength();
}

cartChecker();

export function cartItemsLength() {
  const cartIcon = document.querySelector(".cart-number-icon");

  cartIcon.innerHTML = JSON.parse(localStorage.cart).length;

  cartIcon.onclick = () => {
    location.href = "/cart.html";
  };
}

cartItemsLength();
