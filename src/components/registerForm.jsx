import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { register } from "./../services/userService";
import { loginWithJwt } from "../services/authService";
class RegisterForm extends Form {
  state = { data: { username: "", password: "", name: "" }, errors: {} };
  schema = {
    username: Joi.string().required().email().label("Username"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().required().label("Name"),
  };
  doSubmit = async () => {
    try {
      const response = await register(this.state.data);
      loginWithJwt(response.headers["x-auth-token"]);
      toast.info("Account created successfully");
      window.location = "/react-project/";
    } catch (ex) {
      toast.error("User already exists");
      this.props.history.replace("/react-project/login");
    }
  };
  render() {
    return (
      <div>
        <h2>Register</h2>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
