import _ from "lodash";
import "bootstrap/dist/css/bootstrap.css";
import React, { Component } from "react";
import { toast } from "react-toastify";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import { pagination } from "../utils/pagination";
import Pagination from "./common/pagination";
import { Link } from "react-router-dom";
import ListGroup from "./common/listGroup";
import Searchbox from "./searchBox";
// import MoviesTable from "./moviesTable";
class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    searchQuery: "",
    genres: [],
    sortColumn: { col: "title", order: "asc" },
  };
  async componentDidMount() {
    const { data: genreData } = await getGenres();
    const genres = [{ name: "All Genres", _id: "" }, ...genreData];
    const { data: moviesData } = await getMovies();
    this.setState({ movies: moviesData, genres });
  }
  handleDelete = async (movieToRemove) => {
    const originalMovies = this.state.movies;
    this.setState({
      movies: originalMovies.filter((movie) => movie._id !== movieToRemove._id),
    });
    try {
      await deleteMovie(movieToRemove._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("Already deleted");
      this.setState({ movies: originalMovies });
    }
  };
  handlePage = (i) => {
    this.setState({ currentPage: i });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
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

    const sorted = _.orderBy(filtered, [sortColumn.col], [sortColumn.order]);

    const movies = pagination(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };
  render() {
    const { totalCount, data } = this.getPagedData();
    const { user } = this.props;
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
          {user && (
            <Link
              to="/movies/new"
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              New Movie
            </Link>
          )}
          <p>Showing {totalCount} available movies!</p>
          <Searchbox
            value={this.state.SearchQuery}
            onChange={this.handleSearch}
          />
          {/* <MoviesTable
            movies={data}
            sortColumn={this.state.sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          /> */}
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
