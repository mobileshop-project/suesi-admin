import React, {Component} from 'react';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Logo from '../assets/images/suesi_logo_2.png'
import ShopListScreen from "../screen/ShopListScreen";
import {Link, Route, Switch} from "react-router-dom";
import ApprovalScreen from "../screen/ApprovalScreen";
import UserListScreen from "../screen/UserListScreen";
import CreateOfficialAccountScreen from "../screen/CreateOfficialAccountScreen";
class SideMenuAndData extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isShow: true
    }
  }
  render() {
    const {isShow} = this.state
    return (
      <div className="flex w-screen h-screen">
        <div className="flex w-2/12 h-full">
          <MenuList className="flex flex-col space-y-1 w-full h-full shadow-md">
            <div className="flex h-40 items-center justify-center">
              <img src={Logo} alt="Logo" width="250px" height="auto"/>
            </div>
            <Link to="userList">
              <MenuItem className="h-12" onClick={()=> this.setState({isShow: false})}>
                <p className="font-PoppinsMedium">User list</p>
              </MenuItem>
            </Link>
            <Link to="shopList">
              <MenuItem className="h-12" onClick={()=> this.setState({isShow: false})}>
                <p className="font-PoppinsMedium">Shop list</p>
              </MenuItem>
            </Link>
            <Link to="approval">
              <MenuItem className="h-12" onClick={()=> this.setState({isShow: false})}>
                <p className="font-PoppinsMedium">Approval</p>
              </MenuItem>
            </Link>
            <Link to="createOfficialAccount" onClick={()=> this.setState({isShow: false})}>
              <MenuItem className="h-12">
                <p className="font-PoppinsMedium">Official shop</p>
              </MenuItem>
            </Link>
          </MenuList>
        </div>
        <div className="flex w-10/12 h-full bg-gray-50">
          <div className="flex w-10/12 h-full mx-auto">
            <div className="flex w-full h-5/6 items-center justify-center my-auto">
              {/*{isShow ? <div className="flex w-full h-full items-center justify-center">*/}
              {/*  <p className="font-PoppinsMedium text-6xl">Wellcome to Suesi-Mobile Admin</p>*/}
              {/*</div> : null}*/}
              <Switch>
                <Route path={"/approval"} component={ApprovalScreen} />
                <Route path={"/shopList"} component={ShopListScreen} />
                <Route path={"/userList"} component={UserListScreen} />
                <Route path={"/createOfficialAccount"} component={CreateOfficialAccountScreen} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SideMenuAndData;