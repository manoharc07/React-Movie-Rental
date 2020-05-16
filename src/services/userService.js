import http from "./httpService";
import { apiUrl } from "../config.json";
export function register(user) {
  const body = {
    email: user.username,
    name: user.name,
    password: user.password,
  };
  return http.post(apiUrl + "/users", body);
}
