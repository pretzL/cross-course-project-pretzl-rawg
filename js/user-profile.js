import { getExistingFavorites } from "./components/favoriteFunctions.js";

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const username = params.get("name");

const headingOne = document.querySelector("h1");
const usernameText = document.querySelector(".username-text");

if (username === null) {
  headingOne.innerHTML = "User Profile";
  usernameText.innerHTML = "Username";
} else {
  headingOne.innerHTML = username + "`s profile";
  usernameText.innerHTML = username;
}

const URL = "https://api.rawg.io/api/games";

const key = "?key=35f9fd70b7b54c25bfa1662ebdeaff60";

const favoriteGamesContainer = document.querySelector(".user-favorite-games-content");
const purchasedGamesContainer = document.querySelector(".user-purchased-games-content");

async function getGames() {
  try {
    const response = await fetch(URL + key);
    const results = await response.json();

    const games = results.results;

    favoriteGamesContainer.innerHTML = "";
    purchasedGamesContainer.innerHTML = "";

    const favorites = getExistingFavorites();

    if (favorites.length === 0) {
      favoriteGamesContainer.innerHTML = `<p class="favorites-error">You have no games in your favorites.</p>`;
    }

    for (let i = 0; i < favorites.length; i++) {
      if (i === 3) {
        break;
      }

      let iconHTML = " favorite_border ";

      const favorites = getExistingFavorites();

      const doesObjectExist = favorites.find(function (fav) {
        return Number(fav.id) === Number(favorites[i].id);
      });

      if (doesObjectExist) {
        iconHTML = " favorite ";
      }

      favoriteGamesContainer.innerHTML += `<div class="card">
      <a href="/game-profile.html?id=${favorites[i].id}">
        <img src="${favorites[i].background_image}" class="card-image" alt="${favorites[i].name}"/>
        <h3>${favorites[i].name}</h3>
        <p>Rating: ${favorites[i].rating}</p>
        <p>Released: ${favorites[i].released}</p>
      </a>
      <span class="material-icons md-24 favorite-icon favorite-icon-small">${iconHTML}</span>
      </div>`;
    }

    for (let i = 0; i < games.length; i++) {
      if (i === 3) {
        break;
      }

      purchasedGamesContainer.innerHTML += `<a href="/game-profile.html?id=${games[i].id}" class="card">
          <img src="${games[i].background_image}" class="card-image" alt="${games[i].name}"/>
            <h3>${games[i].name}</h3>
            <p>Rating: ${games[i].rating}</p>
            <p>Released: ${games[i].released}</p>
            </a>`;
    }

    // REMOVE ITEM FROM CART

    const favoriteIcon = document.querySelectorAll(".favorite-icon");

    favoriteIcon.forEach((button) => {
      button.addEventListener("click", removeFromFav);
    });

    function removeFromFav() {
      favorites.forEach((favItem) => {
        const favExists = favorites.find(function (fav) {
          return Number(fav.id) === Number(favItem.id);
        });

        if (!favExists) {
          const gameToFav = favItem;

          currentFav.push(gameToFav);

          saveFav(currentFav);
        } else {
          const newItem = favorites.filter((fav) => fav.id !== favItem.id);
          saveFav(newItem);
        }
      });
    }

    function saveFav(favItem) {
      localStorage.setItem("favorites", JSON.stringify(favItem));
      location.reload();
    }
  } catch (error) {
    console.log(error);
    errorContainer.innerHTML = errorMessage("An error occurred when calling the API, error: " + error);
  }
}

getGames();
