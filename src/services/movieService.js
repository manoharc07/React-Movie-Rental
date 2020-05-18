import http from "./httpService";
export function getMovies() {
  return http.get("/movies");
}
export function getMovie(movieId) {
  return http.get("/movies/" + movieId);
}
export function deleteMovie(movieId) {
  return http.delete("/movies/" + movieId);
}
export function saveMovie(movie) {
  if (movie._id) {
    const modifiedMovie = { ...movie };
    delete modifiedMovie["_id"];
    return http.put("/movies/" + movie._id, modifiedMovie);
  } else {
    return http.post("/movies", movie);
  }
}
