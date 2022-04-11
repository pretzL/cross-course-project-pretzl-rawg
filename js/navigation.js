const label = document.querySelector(".menu-dropdown");
const navbar = document.querySelector(".navbar");

label.addEventListener("click", () => {
  navbar.classList.toggle("hamburger-active");
});
