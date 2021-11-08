import React, {
  Component
} from "react";
import api from "./api";
import tokenService from "./TokenService";
import TokenService from "./TokenService";
import jwt_decode from "jwt-decode";
const querystring = require("querystring");

class Authentication {
  signIn(username, password) {
    const data = querystring.stringify({
      username: username,
      password: password,
    });
    return api.post("login", data).then((response) => {
      if (response.data.access_token) {
        // localStorage.setItem("user", JSON.stringify(response.data));
        TokenService.setUser(response.data);

      }
      return response.data;
    });
  }

  logout() {
    localStorage.removeItem("user");
  }

  getDecodeUser() {
    let user = tokenService.getUser()
    console.log(user + "tesssssss")
  }

  getCurrentUser() {
    let token = "";
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user"))
    }
    return token;
  }

  refreshToken() {
    const token = JSON.parse(localStorage.getItem("user")).refresh_token
    return api.get('token/refresh', { headers: { Authorization: `INK${token}` } })
  }
  deCodeJwt(token) {
    if (!token) {
      return null;
    }
    let user = jwt_decode(token.access_token);
    return user;
  }
}



export default new Authentication();