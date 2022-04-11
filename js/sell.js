const sellForm = document.querySelector(".sell-form");

const gameTitle = document.querySelector("#game-title");
const gameTitleError = document.querySelector("#game-title-error");

const conditionNew = document.querySelector("#condition-new");
const conditionUsed = document.querySelector("#condition-used");
const conditionError = document.querySelector("#condition-error");

const copyPhysical = document.querySelector("#physical");
const copyDigital = document.querySelector("#digital");
const copyError = document.querySelector("#copy-error");

const price = document.querySelector("#price");
const priceError = document.querySelector("#price-error");

const validatorContainer = document.querySelector(".validator-container");

function validateForm(sellForm) {
  sellForm.preventDefault();

  if (checkLength(gameTitle.value, 0)) {
    gameTitleError.style.display = "none";
  } else {
    gameTitleError.style.display = "block";
  }

  if (conditionNew.checked || conditionUsed.checked) {
    conditionError.style.display = "none";
  } else {
    conditionError.style.display = "block";
  }

  if (copyPhysical.checked || copyDigital.checked) {
    copyError.style.display = "none";
  } else {
    copyError.style.display = "block";
  }

  if (checkLength(price.value, 0)) {
    priceError.style.display = "none";
  } else {
    priceError.style.display = "block";
  }

  // Form validated message
  if (checkLength(gameTitle.value, 0) && (conditionNew.checked || conditionUsed.checked) && (copyPhysical.checked || copyDigital.checked) && checkLength(price.value, 0)) {
    validatorContainer.style.display = "block";
  }
}

sellForm.addEventListener("submit", validateForm);

function checkLength(value, char) {
  return value.trim().length > char;
}
