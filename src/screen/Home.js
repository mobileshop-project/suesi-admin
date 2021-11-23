import React, { Component } from "react";
import { Link, withRouter, Route, Switch, Redirect } from "react-router-dom";
import Navbar from "../component/Navbar";
import Menu from "../component/Menu"
import ApprovalScreen from "./ApprovalScreen";
import ShopListScreen from "./ShopListScreen";
import UserListScreen from "./UserListScreen";
import GridForm from "../component/GridForm"
import CreateOfficialAccountScreen from "./CreateOfficialAccountScreen"
class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: 0,
      setValue: 0
    }
  }



  renderMenu() {
    const { value, setValue } = this.state
    return (
      <div  >
        <Menu />
      </div>)
  }

  render() {


    return (
      <div>
        <Navbar />
        {this.renderMenu()}
        <Switch>
          <Route path={"/approval"} component={ApprovalScreen} />
          <Route path={"/shopList"} component={ShopListScreen} />
          <Route path={"/userList"} component={UserListScreen} />
          <Route path={"/createOfficialAccount"} component={CreateOfficialAccountScreen} />
        </Switch>
      
      </div>
    );
  }
}
export default withRouter(Home);
