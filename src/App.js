import "./App.css";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import React, { Component } from "react";
import Home from "./screen/Home";
import SignInScreen from "./screen/SignInScreen";
class App extends Component {
  render() {
    return (
      <div className="w-screen h-auto absolute">
        <Router>
          <Switch>
            <Route exact path={"/signin"} component={SignInScreen} />
            <Route path={"/"} component={Home} />
          </Switch>
        </Router>
      </div >
    );
  }
}

export default App;