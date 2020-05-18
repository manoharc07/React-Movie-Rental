import React from "react";
import { login } from "../services/authService";
import Joi from "joi-browser";
import Form from "./common/form";
import { toast } from "react-toastify";
import { getCurrentUser } from "./../services/authService";
import { Redirect } from "react-router-dom";
class LoginForm extends Form {
  state = { data: { username: "", password: "" }, errors: {} };
  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const user = this.state.data;
      await login(user);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/react-project";
    } catch (ex) {
      toast.error("Invalid Username or Password");
    }
  };
  render() {
    if (getCurrentUser()) return <Redirect to="/react-project" />;
    return (
      <div className="conatainer">
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
