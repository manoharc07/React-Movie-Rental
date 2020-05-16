import http from "./httpService";
import jwtDecode from "jwt-decode";
import { apiUrl } from "../config.json";
http.setJwt(getJwt());
export async function login(user) {
  const body = {
    email: user.username,
    password: user.password,
  };
  const { data: jwt } = await http.post(apiUrl + "/auth", body);
  localStorage.setItem("token", jwt);
}
export function getJwt() {
  return localStorage.getItem("token");
}
export function loginWithJwt(token) {
  localStorage.setItem("token", token);
}
export function logout() {
  localStorage.removeItem("token");
}
export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem("token");
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}
