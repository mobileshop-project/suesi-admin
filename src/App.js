import logo from "./logo.svg";
import "./App.css";
import { Button } from "@mui/material";
import { Bp } from "@mui/material";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import React, { Component } from "react";
import Home from "./screen/Home";
import SignInScreen from "./screen/SignInScreen";
import Navbar from "./component/Navbar";
import ApprovalScreen from "./screen/ApprovalScreen";
import ShopListScreen from "./screen/ShopListScreen";
import UserListScreen from "./screen/UserListScreen";
import createOfficialAccount from "./screen/CreateOfficialAccountScreen";
class App extends Component {
  render() {
    return (
      <div className="w-screen h-auto absolute">
        <Router>
          <Switch>
            <Route exact path={["/", "/signIn"]} component={SignInScreen} />
            <Route path={"/home"} component={Home}>
              <Redirect to="/approval" />
            </Route>
            <Route path={["/approval", "/shopList", "/userList", "/createOfficialAccount"]} component={Home} />

            {/* <Route path="/approval" component={ApprovalScreen} />
            <Route path="/shopList" component={ShopListScreen} />
            <Route path="/userList" component={UserListScreen} /> */}
          </Switch>
        </Router>
      </div >
    );
  }
}

export default App;
