import tokenService from "./TokenService";
import jwt_decode from "jwt-decode";

class Authentication {
  logout() {
    localStorage.removeItem("user");
  }
  getDecodeUser() {
    let token = tokenService.getUser()
    if (token!=null) {
      let user = jwt_decode(token.access_token);
      return user
    }else {
      return null
    }
  }
  getCurrentUser() {
    let token = "";
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user"))
    }
    return token;
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