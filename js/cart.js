import { getExistingCart } from "./components/cartFunctions.js";
import { cartItemsLength } from "./components/cartFunctions.js";

const checkoutButton = document.querySelector(".checkout-btn");

// CART LOCAL STORAGE

const cartContainer = document.querySelector(".cart-container");

const carts = getExistingCart();

if (carts.length === 0) {
  cartContainer.innerHTML = `<p class="cart-error">You have no games in your cart.</p>`;
}

let itemNumber = 1;
let price = 20;

let totalPrice = price * itemNumber;

for (let i = 0; i < carts.length; i++) {
  cartContainer.innerHTML += `
      <div class="cart-item">
        <div class="cart-image-container item-grid1">
          <img src="${carts[i].background_image}" class="cart-image-small" alt="Cart Item Image Small" />
        </div>
        <p class="item-grid2">${carts[i].name}</p>
        <div class="item-total-counter item-grid3">
          <button class="item-number-minus" data-type="minus">-</button>
          <p class="item-total-number" data-type="number">${itemNumber}</p>
          <button class="item-number-plus" data-type="plus">+</button>
        </div>
        <p class="item-price item-grid4" data-type="price">$${totalPrice}</p>
        <div class="item-trashcan item-grid5"><span class="material-icons"> delete </span></div>
      </div>`;
}

// PRICE CALCULATOR

/* const itemTotalNumber = document.querySelectorAll('[data-type="number"]');
const itemPrice = document.querySelectorAll('[data-type="price"]');

const buttonContainer = document.querySelectorAll(".item-one-total-counter");

function createCalc() {
  const div = document.createElement("div");
  const minusButton = document.createElement("button");
  const number = document.createElement("p");
  const plusButton = document.createElement("button");
  const trashcan = document.querySelector(".item-trashcan");

  div.classList.add("item-total-counter item-grid3");
  minusButton.classList.add("item-number-minus");
  number.classList.add("item-total-number");
  plusButton.classList.add("item-number-plus");

  minusButton.dataset.type = "minus";
  number.dataset.type = "number";
  plusButton.dataset.type = "plus";

  minusButton.innerText = "-";
  plusButton.innerText = "+";
  number.innerText = itemNumber;

  minusButton;

  document.body.insertBefore(div, trashcan);
}

buttonContainer.forEach((container) => {
  container.addEventListener("click", (event) => {
    let priceTotal = price * itemNumber;

    if (event.target.dataset.type === "minus") {
      itemNumber--;
      itemTotalNumber.innerHTML = itemNumber;
      itemPrice.innerHTML = priceTotal;
      console.log("minus", itemNumber);
      console.log("price", priceTotal);
    }

    if (event.target.dataset.type === "plus") {
      itemNumber++;
      itemTotalNumber.innerText = itemNumber;
      itemPrice.innerHTML = priceTotal;
      console.log("plus", itemNumber);
      console.log("price", priceTotal);
    }
  });
}); */

// REMOVE ITEM FROM CART

const trashIcon = document.querySelectorAll(".item-trashcan");

trashIcon.forEach((button) => {
  button.addEventListener("click", removeFromCart);
});

function removeFromCart() {
  carts.forEach((cartItem) => {
    const cartExists = carts.find(function (car) {
      return car.id === cartItem.id;
    });

    if (!cartExists) {
      const gameToCart = cartItem;

      currentCart.push(gameToCart);

      saveCart(currentCart);
    } else {
      const newItem = carts.filter((car) => car.id !== cartItem.id);
      saveCart(newItem);
    }
  });
}

function saveCart(cartItem) {
  localStorage.setItem("cart", JSON.stringify(cartItem));
  cartItemsLength();
  location.reload();
}

// CHECKOUT BUTTON REDIRECT

checkoutButton.onclick = () => {
  location.href = "/checkout.html";
};
