export function getExistingFavorites() {
  const favorites = localStorage.getItem("favorites");

  if (!favorites) {
    return [];
  } else {
    return JSON.parse(favorites);
  }
}
