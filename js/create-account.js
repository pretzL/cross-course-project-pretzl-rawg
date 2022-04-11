const form = document.querySelector(".create-account-form");

const firstName = document.querySelector("#first-name");
const firstNameError = document.querySelector("#first-name-error");

const lastName = document.querySelector("#last-name");
const lastNameError = document.querySelector("#last-name-error");

const email = document.querySelector("#email");
const emailError = document.querySelector("#email-error");

const username = document.querySelector("#username");
const usernameError = document.querySelector("#username-error");

const password = document.querySelector("#password");
const passwordError = document.querySelector("#password-error");

const passwordTwo = document.querySelector("#password-two");
const passwordTwoError = document.querySelector("#password-two-error");

const validatorContainer = document.querySelector(".validator-container");

const buttonSubmit = document.querySelector(".form-btn");

function validateForm(form) {
  form.preventDefault();

  if (checkLength(firstName.value, 0)) {
    firstNameError.style.display = "none";
  } else {
    firstNameError.style.display = "block";
  }

  if (checkLength(lastName.value, 0)) {
    lastNameError.style.display = "none";
  } else {
    lastNameError.style.display = "block";
  }

  if (validateEmail(email.value)) {
    emailError.style.display = "none";
  } else {
    emailError.style.display = "block";
  }

  if (checkLength(username.value, 4)) {
    usernameError.style.display = "none";
  } else {
    usernameError.style.display = "block";
  }

  if (checkLength(password.value, 4)) {
    passwordError.style.display = "none";
  } else {
    passwordError.style.display = "block";
  }

  if (password.value === passwordTwo.value) {
    passwordTwoError.style.display = "none";
  } else {
    passwordTwoError.style.display = "block";
  }

  // Form validated message
  if (
    checkLength(firstName.value, 0) &&
    checkLength(lastName.value, 0) &&
    validateEmail(email.value) &&
    checkLength(username.value, 4) &&
    checkLength(password.value, 4) &&
    password.value === passwordTwo.value
  ) {
    validatorContainer.style.display = "block";
    buttonSubmit.onclick = setTimeout(() => {
      location.href = "/login.html";
    }, 2000);
  }
}

form.addEventListener("submit", validateForm);

function checkLength(value, char) {
  return value.trim().length > char;
}

// Taken from video "Simple form validation" from Noroff JS1 Module 4 lesson 4.
function validateEmail(email) {
  const regEx = /\S+@\S+\.\S+/;
  const patternMatches = regEx.test(email);
  return patternMatches;
}
