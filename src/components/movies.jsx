import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import "bootstrap/dist/css/bootstrap.css";
import Pagination from "./common/pagination";
import MoviesTable from "./moviestable";
import { pagination } from "../utils/pagination";
import ListGroup from "./common/listGroup";
import _ from "lodash";
class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    sortColumn: { col: "title", order: "asc" },
  };
  componentDidMount() {
    const genres = [{ name: "All Genres", _id: "" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }
  handleDelete = (movieToRemove) => {
    this.setState({
      movies: this.state.movies.filter(
        (movie) => movie._id !== movieToRemove._id
      ),
    });
  };
  handlePage = (i) => {
    this.setState({ currentPage: i });
  };
  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  handleChange = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  render() {
    if (this.state.movies.length === 0) return <p>No Movies available</p>;
    const filtered =
      this.state.selectedGenre && this.state.selectedGenre._id
        ? this.state.movies.filter(
            (movie) => movie.genre._id === this.state.selectedGenre._id
          )
        : this.state.movies;
    const ordered = _.orderBy(
      filtered,
      [this.state.sortColumn.col],
      [this.state.sortColumn.order]
    );
    const movies = pagination(
      ordered,
      this.state.currentPage,
      this.state.pageSize
    );
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            onChange={this.handleChange}
            selectedItem={this.state.selectedGenre}
          />
        </div>
        <div className="col">
          <p>Showing {filtered.length} available movies!</p>
          <MoviesTable
            movies={movies}
            sortColumn={this.state.sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            count={filtered.length}
            pageSize={this.state.pageSize}
            currentPage={this.state.currentPage}
            ChangePage={this.handlePage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
