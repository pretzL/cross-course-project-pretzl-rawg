const contactForm = document.querySelector(".contact-form");

const username = document.querySelector("#username");
const usernameError = document.querySelector("#username-error");

const password = document.querySelector("#password");
const passwordError = document.querySelector("#password-error");

const validatorContainer = document.querySelector(".validator-container");

const loginButton = document.querySelector(".login-btn");
const createAccountButton = document.querySelector(".create-account-btn");

function validateLogin(contactForm) {
  contactForm.preventDefault();

  if (checkLength(username.value, 2)) {
    usernameError.style.display = "none";
  } else {
    usernameError.style.display = "block";
  }

  if (checkLength(password.value, 5)) {
    passwordError.style.display = "none";
  } else {
    passwordError.style.display = "block";
  }

  // Validation Message Checker
  if (checkLength(username.value, 2) && checkLength(password.value, 5)) {
    validatorContainer.style.display = "block";
    setTimeout(() => {
      location.href = "/user-profile.html?name=" + username.value;
    }, 2000);
  }
}

contactForm.addEventListener("submit", validateLogin);

function checkLength(value, char) {
  return value.trim().length > char;
}

createAccountButton.onclick = () => {
  location.href = `/create-account.html`;
};
