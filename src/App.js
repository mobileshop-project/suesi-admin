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

class App extends Component {
  render() {
    return (
      <div className="w-screen h-auto absolute ">
        <Navbar />

        <Router>
          <Switch>
            <Route exact path={["/", "/signIn"]} component={SignInScreen} />

            <Route exact path={"/home"} component={Home} />
          </Switch>
        </Router>
      </div >
    );
  }
}

export default App;
