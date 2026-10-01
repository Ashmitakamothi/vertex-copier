import { request } from "./index.js";

export const loginUser = (credentials) => {
  return request("POST", "auth/login", credentials);
};
