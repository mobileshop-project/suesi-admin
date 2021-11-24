import React, { Component } from "react";
import {withRouter} from "react-router-dom";
import SideMenuAndData from "../component/SideMenuAndData";
import AuthService from "../service/AuthService";
class Home extends Component {

  componentDidMount() {
    this.checkUser();
  }

  checkUser(){
    const user = AuthService.deCodeJwt(AuthService.getCurrentUser())
    if(!user){
      this.props.history.push("signin")
    }
  }

  render() {
    return (
      <div>
        <SideMenuAndData/>
      </div>
    );
  }
}
export default withRouter(Home);
