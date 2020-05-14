import _ from "lodash";
import "bootstrap/dist/css/bootstrap.css";
import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import MoviesTable from "./moviesTable";
import { pagination } from "../utils/pagination";
import ListGroup from "./common/listGroup";
import { Link } from "react-router-dom";
import Searchbox from "./searchBox";
class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    searchQuery: "",
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
  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };
  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      searchQuery,
      movies: allMovies,
    } = this.state;

    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = pagination(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };
  render() {
    const { totalCount, data } = this.getPagedData();
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
          <Link
            to="/movies/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Movie
          </Link>
          <p>Showing {totalCount} available movies!</p>
          <Searchbox
            value={this.state.SearchQuery}
            onChange={this.handleSearch}
          />
          <MoviesTable
            movies={data}
            sortColumn={this.state.sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            count={totalCount}
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
