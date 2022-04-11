import { getExistingFavorites } from "./components/favoriteFunctions.js";
import { getExistingCart } from "./components/cartFunctions.js";
import { cartItemsLength } from "./components/cartFunctions.js";

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

// if the id is null, then redirect to the home page
if (id === null) {
  location.href = "/";
}

const baseURL = "https://api.rawg.io/api/games";
const key = "?key=35f9fd70b7b54c25bfa1662ebdeaff60";
const detailsURL = baseURL + "/" + id + key;

const cors = "https://noroffcors.herokuapp.com/";

const gameInfo = document.querySelector(".game-info");
const pageTitle = document.querySelector("title");
const headingOne = document.querySelector("h1");
const headerImage = document.querySelector(".header-image-thinner");
const subHeading1 = document.querySelector(".subheading1");
const subHeading2 = document.querySelector(".subheading2");
const suggestedGames = document.querySelector(".suggested-games");

async function fetchSingleGame() {
  try {
    //INITIAL ID QUERY
    const response = await fetch(detailsURL);
    const singleResult = await response.json();
    console.log(singleResult);
    const gameGenres = singleResult.genres;

    let background2 = singleResult.background_image;

    if (singleResult.background_image_additional !== null) {
      background2 = singleResult.background_image_additional;
    }

    let developer = "Unknown";

    if (singleResult.developers.length > 0) {
      developer = singleResult.developers[0].name;
    }

    pageTitle.innerHTML = `${singleResult.name}`;
    headingOne.innerHTML = `${singleResult.name}`;
    headerImage.style.backgroundImage = `linear-gradient(rgb(0, 0, 0, 0.5), rgb(0, 0, 0, 0.5)), url(${singleResult.background_image})`;
    subHeading1.style.background = `linear-gradient(rgb(0, 0, 0, 0.5), rgb(0, 0, 0, 0.5)), url(${background2})`;
    subHeading2.style.background = `linear-gradient(rgb(0, 0, 0, 0.5), rgb(0, 0, 0, 0.5)), url(${background2})`;
    headerImage.style.backgroundSize = "cover";
    headerImage.style.backgroundRepeat = "norepeat";
    headerImage.style.backgroundPosition = "center";
    subHeading1.style.backgroundSize = "cover";
    subHeading1.style.backgroundRepeat = "norepeat";
    subHeading1.style.backgroundPosition = "center";
    subHeading2.style.backgroundSize = "cover";
    subHeading2.style.backgroundRepeat = "norepeat";
    subHeading2.style.backgroundPosition = "center";

    const allGenres = gameGenres.map((game) => game.name).join(", ");

    const descriptionString = singleResult.description;

    const filteredSentences = descriptionString.split(".").filter((item, index) => {
      if (index < 7) {
        return item;
      }
    });

    gameInfo.innerHTML = `<img src=${singleResult.background_image} class="game-image-large game-grid1" />
                          <img src=${background2} class="game-image-small game-grid2" />
                          <div class="about-the-game game-grid3">
                          <p>Rating: ${singleResult.rating}</p>
                          <p>Release date: ${singleResult.released}</p>
                          <p>Developer: ${developer}</p>
                          <p>Tags: ${allGenres}</p>
                          <p>Price: $38</p>
                          <div class="game-profile-buttons">
                          <button class="cart-cta btn open-button add-to-cart-cta"><span class="material-icons md-18 cart-cta-icon"> shopping_cart </span>Add to Cart</button>
                          <span class="material-icons md-36 favorite-icon"> favorite_border </span>
                          </div>
                          <dialog class="modal" id="modal">
                            <p>Item added to cart!</p>
                            <div class="flex modal-buttons">
                            <button class="cart-cta btn close-button">Close</button>
                            <button class="cart-cta btn checkout-button">Cart</button>
                            </div>
                          </dialog>
                          </div>
                          <div class="game-summary game-grid4">
                          <h3>Summary</h3>
                          <p class="game-summary">${filteredSentences}</p>
                          </div>`;
    // MODAL

    const modal = document.querySelector("#modal");
    const openButton = document.querySelector(".open-button");
    const closeButton = document.querySelector(".close-button");

    const checkoutButton = document.querySelector(".checkout-button");

    openButton.addEventListener("click", () => {
      modal.showModal();
    });

    closeButton.addEventListener("click", () => {
      modal.close();
    });

    checkoutButton.onclick = () => {
      location.href = "/cart.html";
    };

    //FAVORITE ICON

    const favoriteIcon = document.querySelector(".favorite-icon");

    favoriteIcon.addEventListener("click", handleClick);

    const favorites = getExistingFavorites();

    const doesObjectExist = favorites.find(function (fav) {
      return fav.id === singleResult.id;
    });

    if (doesObjectExist) {
      favoriteIcon.innerHTML = " favorite ";
    }

    function handleClick() {
      if (favoriteIcon.innerHTML === " favorite_border ") {
        favoriteIcon.innerHTML = " favorite ";
      } else {
        favoriteIcon.innerHTML = " favorite_border ";
      }

      const currentFavorites = getExistingFavorites();

      const favoriteExists = currentFavorites.find(function (fav) {
        return fav.id === singleResult.id;
      });

      if (!favoriteExists) {
        const gameToFavorite = singleResult;

        currentFavorites.push(gameToFavorite);

        saveFavorites(currentFavorites);
      } else {
        const newFavorites = currentFavorites.filter((fav) => fav.id !== singleResult.id);
        saveFavorites(newFavorites);
      }
    }

    function saveFavorites(favorites) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }

    // ADD TO CART

    const cartCtaButton = document.querySelector(".add-to-cart-cta");

    cartCtaButton.addEventListener("click", handleCart);

    function handleCart() {
      const currentCart = getExistingCart();

      const cartExists = currentCart.find(function (item) {
        return item.id === singleResult.id;
      });

      if (!cartExists) {
        const gameToCart = singleResult;

        currentCart.push(gameToCart);

        saveCart(currentCart);
      } else {
        const newCart = currentCart.filter((item) => item.id !== singleResult.id);
        saveCart(newCart);
      }
    }

    function saveCart(cartItem) {
      localStorage.setItem("cart", JSON.stringify(cartItem));
      cartItemsLength();
    }

    //SUGGESTED GAMES QUERY

    let loopedGameSlugs = "";
    let slug1 = "adventure";
    let slug2 = "";

    for (let count = 0; count < gameGenres.length; count++) {
      if (count === 2) {
        break;
      }

      if (gameGenres[0].slug) {
        slug1 = gameGenres[0].slug;
      }

      if (gameGenres.slug) {
        slug2 = gameGenres[1].slug;
      }

      loopedGameSlugs += gameGenres[count].slug + ",";
    }

    const tags = `&genres=${slug1},${slug2}`;
    const suggestedURL = cors + baseURL + key + tags;
    const suggestedResponse = await fetch(suggestedURL);
    const suggestedSingleResult = await suggestedResponse.json();

    const suggestedGamesResult = suggestedSingleResult.results;

    suggestedGames.innerHTML = "";

    const filteredID = Number(id);
    const filteredGames = suggestedGamesResult.filter((game) => game.id !== filteredID).slice(0, 3);

    for (let i = 0; i < filteredGames.length; i++) {
      if (i === 3) {
        break;
      }

      suggestedGames.innerHTML += `<a href="/game-profile.html?id=${filteredGames[i].id}" class="card">
          <img src="${filteredGames[i].background_image}" class="card-image" alt="${filteredGames[i].name}"/>
            <h3>${filteredGames[i].name}</h3>
            <p>Rating: ${filteredGames[i].rating}</p>
            <p>Released: ${filteredGames[i].released}</p>
            </a>`;
    }
  } catch (error) {
    console.log(error);
    errorContainer.innerHTML = errorMessage("An error occurred when calling the API, error: " + error);
  }
}

fetchSingleGame();
