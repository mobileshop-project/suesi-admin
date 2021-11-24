import jwt_decode from "jwt-decode";
import api from "./api";
import TokenService from "./TokenService";
const API_URL = "https://www.tarkom-projects.com/api/v1/";
const querystring = require("querystring");

class AuthService {
	resendActivationCode(username) {
		const data = querystring.stringify({
			username: username,
		});
		return api.post(API_URL + "register/resend", data);
	}

	signin(username, password) {
		const data = querystring.stringify({
			username: username,
			password: password,
		});
		return api.post("login", data)
			.then((response) => {
				if (response.data.access_token) {
					// localStorage.setItem("user", JSON.stringify(response.data));
					TokenService.setUser(response.data)
				}
			return response.data;
		});
	}

	logout() {
		TokenService.removeUser();
		localStorage.removeItem("cart");
	}

	register(username, email, password) {
		const data = querystring.stringify({
			username: username,
			password: password,
			email: email,
		});
		return api.post(API_URL + "register", data);
	}

	getCurrentUser() {
		let token = "";
		if(localStorage.getItem("user")){
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

	checkSellerRole() {
		const token = JSON.parse(localStorage.getItem("user"))?.access_token
		return api.get(API_URL + "test/seller", {headers: {Authorization: `INK${token}`}})
	}

	checkBuyerRole(){
		return api.get("test/buyer")
	}
}

export default new AuthService();
