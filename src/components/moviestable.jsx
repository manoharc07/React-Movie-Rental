import React, { Component } from "react";
import Like from "./common/like";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../services/authService";
import Table from "./common/table";
class MoviesTable extends Component {
  raiseSort(col) {
    let sortColumn = { ...this.props.sortColumn };
    if (sortColumn.col === col) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.col = col;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  }
  columns = [
    {
      col: "title",
      label: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { col: "genre.name", label: "Genre" },
    { col: "numberInStock", label: "Stock" },
    { col: "dailyRentalRate", label: "Cost" },
    {
      key: "like",
      content: (movie) => (
        <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
      ),
    },
  ];
  deleteColumn = {
    key: "delete",
    content: (movie) => (
      <button
        onClick={() => this.props.onDelete(movie)}
        className="btn btn-primary btn-danger"
      >
        Delete
      </button>
    ),
  };

  constructor() {
    super();
    const user = getCurrentUser();
    if (user && user.isAdmin) this.columns.push(this.deleteColumn);
  }
  render() {
    const { movies } = this.props;
    return (
      <Table
        data={movies}
        columns={this.columns}
        sortColumn={this.props.sortColumn}
        onSort={this.props.onSort}
      />
    );
  }
}
export default MoviesTable;
