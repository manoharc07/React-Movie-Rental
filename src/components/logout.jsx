import { Component } from "react";
import { logout } from "../services/authService";
class Logout extends Component {
  componentDidMount() {
    logout();
    window.location = "/react-project/";
  }
  render() {
    return null;
  }
}

export default Logout;
