import React, { Component } from "react";
import { withRouter } from "react-router";
import { Button } from "@mui/material";
import logo from "../assets/images/suesi_logo.png";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { blue } from "@mui/material/colors";
import Alert from "../service/Alert";
import { Link } from "react-router-dom";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: undefined,
      role: undefined,
      currentPage: props.currentPage,
      navbarOpen: false,
      showSeller: false,
    };
  }



  logout() {
    Alert.confirmLogout().then(() => {
      this.setState({
        username: undefined,
        role: undefined,
        currentPage: this.props.currentPage,
        navbarOpen: false,
        showSeller: false,
        redirect: true,
      });
      this.props.history.push("/signIn");
    });
  }

  render() {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar style={{ backgroundColor: blue[900] }}>
            <Link to="/">  <img src={logo} alt="" className="w-auto h-12" /></Link>
            
            {/* <IconButton
              size="large"
              edge="start"
              color={"inherit"}
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton> */}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Admin Manager
            </Typography>
            <Button onClick={this.logout.bind(this)} color="inherit">Logout</Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
}
export default withRouter(Navbar);
