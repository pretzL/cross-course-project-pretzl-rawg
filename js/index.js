import { getExistingFavorites } from "./components/favoriteFunctions.js";

const URL = "https://api.rawg.io/api/games?key=35f9fd70b7b54c25bfa1662ebdeaff60";

const comingSoonContainer = document.querySelector(".content-coming-soon");
const hotContainer = document.querySelector(".content-hot");
const marketplaceContainer = document.querySelector(".content-marketplace");

async function getGames() {
  try {
    const response = await fetch(URL);
    const results = await response.json();

    const games = results.results;

    hotContainer.innerHTML = "";

    for (let i = 0; i < games.length; i++) {
      if (i === 4) {
        break;
      }

      let iconHTML = " favorite_border ";

      const favorites = getExistingFavorites();

      const doesObjectExist = favorites.find(function (fav) {
        return Number(fav.id) === Number(games[i].id);
      });

      if (doesObjectExist) {
        iconHTML = " favorite ";
      }

      hotContainer.innerHTML += `<div class="card">
      <a href="/game-profile.html?id=${games[i].id}">
        <img src="${games[i].background_image}" class="card-image" alt="${games[i].name}"/>
        <h3>${games[i].name}</h3>
        <p>Rating: ${games[i].rating}</p>
        <p>Released: ${games[i].released}</p>
      </a>
        <span class="material-icons md-24 favorite-icon favorite-icon-small" data-id="${games[i].id}" data-img="${games[i].background_image}" data-name="${games[i].name}" data-rating="${games[i].rating}" data-rel="${games[i].released}">${iconHTML}</span>
      </div>`;
    }

    marketplaceContainer.innerHTML = "";

    for (let i = 4; i < games.length; i++) {
      if (i === 8) {
        break;
      }

      let iconHTML = " favorite_border ";

      const favorites = getExistingFavorites();

      const doesObjectExist = favorites.find(function (fav) {
        return Number(fav.id) === Number(games[i].id);
      });

      if (doesObjectExist) {
        iconHTML = " favorite ";
      }

      marketplaceContainer.innerHTML += `<div class="card">
      <a href="/game-profile.html?id=${games[i].id}">
        <img src="${games[i].background_image}" class="card-image" alt="${games[i].name}"/>
        <h3>${games[i].name}</h3>
        <p>Rating: ${games[i].rating}</p>
        <p>Released: ${games[i].released}</p>
      </a>
        <span class="material-icons md-24 favorite-icon favorite-icon-small" data-id="${games[i].id}" data-img="${games[i].background_image}" data-name="${games[i].name}" data-rating="${games[i].rating}" data-rel="${games[i].released}">${iconHTML}</span>
      </div>`;
    }

    comingSoonContainer.innerHTML = "";

    for (let i = 8; i < games.length; i++) {
      if (i === 12) {
        break;
      }

      let iconHTML = " favorite_border ";

      const favorites = getExistingFavorites();

      const doesObjectExist = favorites.find(function (fav) {
        return Number(fav.id) === Number(games[i].id);
      });

      if (doesObjectExist) {
        iconHTML = " favorite ";
      }

      comingSoonContainer.innerHTML += `<div class="card">
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

getGames();
