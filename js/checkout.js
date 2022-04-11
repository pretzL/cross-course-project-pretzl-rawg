import { getExistingCart } from "./components/cartFunctions.js";
import { cartItemsLength } from "./components/cartFunctions.js";

// Form tutorial by Web Dev Simplified (YouTube)

const multiStepForm = document.querySelector("[data-multi-step]");
const formSteps = [...multiStepForm.querySelectorAll("[data-step]")];
const progressBar = document.querySelector(".progress-bar");
const progressBarSteps = [...progressBar.querySelectorAll(".progress-step")];
const validatorContainer = document.querySelector(".validator-container");

let currentStep = formSteps.findIndex((step) => {
  return step.classList.contains("active");
});

if (currentStep < 0) {
  currentStep = 0;
  formSteps[currentStep].classList.add("active");
  showCurrentStep();
}

multiStepForm.addEventListener("click", (e) => {
  let incrementor;
  if (e.target.matches("[data-next]")) {
    incrementor = 1;
  } else if (e.target.matches("[data-previous]")) {
    incrementor = -1;
  } else {
    return;
  }

  if (incrementor === null) {
    return;
  }
  const formInputs = [...formSteps[currentStep].querySelectorAll("input")];
  const allValid = formInputs.every((input) => input.reportValidity());
  if (allValid) {
    currentStep += incrementor;
    showCurrentStep();
  }
});

formSteps.forEach((step) => {
  step.addEventListener("animationend", (e) => {
    formSteps[currentStep].classList.remove("hide");
    e.target.classList.toggle("hide", !e.target.classList.contains("active"));
  });
});

function showCurrentStep() {
  formSteps.forEach((step, index) => {
    step.classList.toggle("active", index === currentStep);
  });
  progressBarSteps.forEach((step, index) => {
    step.classList.toggle("progress-active", index === currentStep);
  });
}

function noSubmit(form) {
  form.preventDefault();
  validatorContainer.style.display = "block";
}

multiStepForm.addEventListener("submit", noSubmit);

// CART LOCAL STORAGE

const checkoutContainer = document.querySelector(".checkout-container");
const itemTotal = document.querySelector(".item-total-price");

const carts = getExistingCart();

if (carts.length === 0) {
  checkoutContainer.innerHTML = `<p class="cart-error">You have no games in your cart.</p>`;
}

let itemNumber = 1;

let price = 19.94;

let priceTotal = price * itemNumber;

let calculatedPriceTotal = priceTotal * carts.length;

for (let i = 0; i < carts.length; i++) {
  checkoutContainer.innerHTML += `
      <div class="checkout-item">
        <p class="">${carts[i].name}</p>
        <div class="price-icon-container">
          <p class="item-price">$ ${priceTotal}</p>
          <div class="item-trashcan"><span class="material-icons"> delete </span></div>
        </div>
      </div>`;
}

itemTotal.innerHTML = "Total: $" + calculatedPriceTotal.toFixed(2);

/* <h3 class="">Item</h3>
                  <div class="checkout-item-one">
                    <p>The Elder Scrolls V: Skyrim</p>
                  </div>
                  <div class="checkout-item-two">
                    <p>Raft</p>
                  </div>
                </div>
                <div class="checkout-price checkout-grid3">
                  <h3>Price</h3>
                  <div class="price-list">
                    <p class="item-one-price">$40.83</p>
                    <p class="item-two-price">$19.94</p>
                  </div>
*/
