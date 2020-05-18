import http from "./httpService";
export function register(user) {
  const body = {
    email: user.username,
    name: user.name,
    password: user.password,
  };
  return http.post("/users", body);
}
