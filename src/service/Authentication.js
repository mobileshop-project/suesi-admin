import React, {
  Component
} from "react";
import api from "./api";
import TokenService from "./token.service";
const querystring = require("querystring");

class Authentication extends Component {
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

}



export default new Authentication();