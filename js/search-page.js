import { getExistingFavorites } from "./components/favoriteFunctions.js";

const cors = "https://noroffcors.herokuapp.com/";

const baseURL = "https://api.rawg.io/api/games";

const key = "?key=35f9fd70b7b54c25bfa1662ebdeaff60";

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const search = params.get("search");

const searchContainer = document.querySelector(".search-content");

async function getSearch() {
  try {
    searchContainer.innerHTML = "";
    errorContainer.innerHTML = "";

    const url = cors + baseURL + key + "&search=" + search;

    const response = await fetch(url);
    const results = await response.json();

    const games = results.results;

    for (let i = 8; i < games.length; i++) {
      if (games.length === 0) {
        errorContainer.innerHTML = errorMessage("We don't recognize that game");
        errorContainer.style.display = "block";
      }
      if (games.length < 1) {
        errorContainer.innerHTML = errorMessage("Please be more specific");
        errorContainer.style.display = "block";
      }
      if (games[i].rating === 0) {
        continue;
      }

      let iconHTML = " favorite_border ";

      const favorites = getExistingFavorites();

      const doesObjectExist = favorites.find(function (fav) {
        return Number(fav.id) === Number(games[i].id);
      });

      if (doesObjectExist) {
        iconHTML = " favorite ";
      }

      searchContainer.innerHTML += `<div class="card">
      <a href="/game-profile.html?id=${games[i].id}">
        <img src="${games[i].background_image}" class="card-image" alt="${games[i].name}"/>
        <h3>${games[i].name}</h3>
        <p>Rating: ${games[i].rating}</p>
        <p>Released: ${games[i].released}</p>
      </a>
      <span class="material-icons md-24 favorite-icon favorite-icon-small" data-id="${games[i].id}" data-img="${games[i].background_image}" data-name="${games[i].name}" data-rating="${games[i].rating}" data-rel="${games[i].released}">${iconHTML}</span>
      </div>`;
    }

    // FAVORITES SYSTEM

    const favoriteButtons = document.querySelectorAll(".favorite-icon");

    favoriteButtons.forEach((button) => {
      button.addEventListener("click", handleClick);
    });

    function handleClick({ target }) {
      if (target.innerHTML === " favorite_border ") {
        target.innerHTML = " favorite ";
      } else {
        target.innerHTML = " favorite_border ";
      }

      const gameId = this.dataset.id;
      const gameImg = this.dataset.img;
      const gameName = this.dataset.name;
      const gameRating = this.dataset.rating;
      const gameRel = this.dataset.rel;

      const currentFavorites = getExistingFavorites();

      const favoriteExists = currentFavorites.find(function (fav) {
        return fav.id === gameId;
      });

      if (!favoriteExists) {
        const gameToFavorite = { id: gameId, background_image: gameImg, name: gameName, rating: gameRating, released: gameRel };
        currentFavorites.push(gameToFavorite);

        saveFavorites(currentFavorites);
      } else {
        const newFavorites = currentFavorites.filter((fav) => fav.id !== gameId);
        saveFavorites(newFavorites);
      }
    }

    function saveFavorites(fav) {
      localStorage.setItem("favorites", JSON.stringify(fav));
    }
  } catch (error) {
    console.log(error);
    errorContainer.innerHTML = errorMessage("An error occurred when calling the API, error: " + error);
  }
}

getSearch();
