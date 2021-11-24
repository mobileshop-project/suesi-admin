import React, { Component } from "react";

import { Link , withRouter } from "react-router-dom";
import { Button } from "@mui/material";
import logo from "../assets/images/suesi_logo.png";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
 
import { blue } from "@mui/material/colors";
import Alert from "../service/Alert";
import Authentication from "../service/Authentication";
 


class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: undefined,
            role: undefined,
            currentPage: props.currentPage,
            navbarOpen: false,
            showSeller: false,
            isRedirect: false
        };

    }

    componentDidMount(){
    
    }



 
    logout() {
        Alert.confirmLogout().then(() => {
            this.setState({
                username: undefined,
                role: undefined,
                currentPage: this.props.currentPage,
                navbarOpen: false,
                showSeller: false,
            });
            this.props.history.push("/signin"); 
        });
      
    }


    renderNav() {
        return <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar style={{ backgroundColor: blue[900] }}>
                    <Link to="/home">  <img src={logo} alt="" className="w-auto h-12" /></Link>

                    {/* <IconButton
  size="large"
  edge="start"
  color={"inherit"}
  aria-label="menu"
  sx={{ mr: 2 }}
>
  <MenuIcon />
</IconButton> */}
                    <Typography className="cursor-default" variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Admin Manager
                    </Typography>
                    {/* <Button onClick={this.logout.bind(this)} color="inherit">Bew</Button> */}
   
                    <Button onClick={this.logout.bind(this)} color="inherit">Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
    }

    render() {
        // const { isRedirect } = this.state
        return (<div>
            {/* <div className="absolute z-10"> <Menu /></div> */}
            <div className="z-50">
                {this.renderNav()}</div>
        </div>)


    }
}
export default withRouter(Navbar)
