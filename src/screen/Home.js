import React, { Component } from "react";
import { withRouter } from "react-router-dom";
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
      <div className="bg-red-200 flex justify-center h-12 w-full">
        <Box sx={{ width: 500 }}>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
            <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
            <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
          </BottomNavigation>
        </Box>
        <div className="bg-yellow-200 h-12 w-auto"> Petition</div>
        <div className="bg-yellow-200 h-12 w-auto"> Petition</div>
      </div>)
  }

  render() {


    return (
      <div>
        <Navbar />
        {this.renderMenu()}
      </div>
    );
  }
}
export default withRouter(Home);
