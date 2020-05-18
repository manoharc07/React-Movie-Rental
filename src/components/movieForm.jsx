import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getGenres } from "./../services/genreService";
import { getMovie, saveMovie } from "./../services/movieService";
import { toast } from "react-toastify";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Daily Rental Rate"),
  };
  async componentDidMount() {
    const { data: genresData } = await getGenres();
    this.setState({ genres: genresData });
    const { match } = this.props;
    const id = match.params.id;
    if (id === "new") return;
    try {
      const { data: movie } = await getMovie(id);
      const data = {
        _id: movie._id,
        title: movie.title,
        genreId: movie.genre._id,
        numberInStock: movie.numberInStock,
        dailyRentalRate: movie.dailyRentalRate,
      };
      this.setState({ data });
    } catch (ex) {
      toast.error("Movie not found!");
      return this.props.history.replace("/react-project/not-found");
    }
  }
  doSubmit = async () => {
    await saveMovie(this.state.data);
    this.props.history.replace("/react-project/movies");
  };
  render() {
    return (
      <React.Fragment>
        <h2>Movie Form</h2>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </React.Fragment>
    );
  }
}

export default MovieForm;
