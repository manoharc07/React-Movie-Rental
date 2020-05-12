import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Movies from "./components/movies";
import NavBar from "./components/navBar";
import Customers from "./components/cutomers";
import Rentals from "./components/rentals";
import Notfound from "./components/notFound";
import "./App.css";
import MovieForm from "./components/movieForm";
function App() {
  return (
    <React.Fragment>
      <NavBar />
      <main className="container">
        <Switch>
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/movies" exact component={Movies} />
          <Route path="/not-found" component={Notfound} />
          <Route path="/movies/:id" component={MovieForm} />
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
