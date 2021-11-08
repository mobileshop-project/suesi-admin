import React, { Component } from "react";
import { Link, withRouter, Route, Switch, Redirect } from "react-router-dom";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { DataGridPro } from '@mui/x-data-grid-pro';
import { useDemoData } from "@mui/x-data-grid-generator";
import Navbar from "../component/Navbar";
import { BottomNavigation } from '@mui/material';
import { BottomNavigationAction } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import ShopList from "./ShopListScreen";
import { Toolbar } from '@mui/material';
import Menu from "../component/Menu"
import ApprovalScreen from "./ApprovalScreen";
import ShopListScreen from "./ShopListScreen";
import UserListScreen from "./UserListScreen";
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
        </Switch>
      </div>
    );
  }
}
export default withRouter(Home);
