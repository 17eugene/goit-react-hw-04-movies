const API_KEY = "da5c3785a5632e6df31c937660854faf";
const BASE_URL = "https://api.themoviedb.org/3";

function fetchData(url) {
  return fetch(url).then((response) => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error("Not found"));
  });
}

export function getDayTopMovies() {
  return fetchData(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
}

export function searchMovieByKeyWord(searchQuery) {
  return fetchData(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${searchQuery}&page=1&include_adult=false`
  );
}

export function getMovieDetails(movieId) {
  return fetchData(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`
  );
}

export function getCastMovieInfo(movieId) {
  return fetchData(
    `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`
  );
}

export function getMovieReview(movieId, page) {
  return fetchData(
    `${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US&page=1`
  );
}
export { fetchData };
