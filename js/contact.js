const form = document.querySelector(".contact-form");

const firstName = document.querySelector("#first-name");
const firstNameError = document.querySelector("#first-name-error");

const lastName = document.querySelector("#last-name");
const lastNameError = document.querySelector("#last-name-error");

const subject = document.querySelector("#subject");
const subjectError = document.querySelector("#subject-error");

const email = document.querySelector("#email");
const emailError = document.querySelector("#email-error");

const validatorContainer = document.querySelector(".validator-container");

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

  if (checkLength(subject.value, 9)) {
    subjectError.style.display = "none";
  } else {
    subjectError.style.display = "block";
  }

  if (validateEmail(email.value)) {
    emailError.style.display = "none";
  } else {
    emailError.style.display = "block";
  }

  // Form validated message
  if (checkLength(firstName.value, 0) && checkLength(lastName.value, 0) && checkLength(subject.value, 9) && validateEmail(email.value)) {
    validatorContainer.style.display = "block";
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
