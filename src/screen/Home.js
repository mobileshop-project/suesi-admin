import React, { Component } from "react";
import { withRouter } from "react-router";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { DataGridPro } from '@mui/x-data-grid-pro';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [
        { id: 1, col1: "Hello", col2: "World" },
        { id: 2, col1: "XGrid", col2: "is Awesome" },
        { id: 3, col1: "Material-UI", col2: "is Amazing" },
        { id: 4, col1: "Hello", col2: "World" },
        { id: 5, col1: "XGrid", col2: "is Awesome" },
        { id: 6, col1: "Material-UI2", col2: "is Amazing" },
      ],
      columns: [
        { field: "col1", headerName: "Column 1", width: 150 },
        { field: "col2", headerName: "Column 2", width: 150 },
      ],
    };
  }

  render() {
    const columns: GridColDef[] = [
      { field: "col1", headerName: "Column 1", width: 150 },
      { field: "col2", headerName: "Column 2", width: 150 },
    ];

    const rows: GridRowsProp = [
      { id: 1, col1: "Hello", col2: "World" },
      { id: 2, col1: "DataGridPro", col2: "is Awesome" },
      { id: 3, col1: "MUI", col2: "is Amazing" },
    ];

    return (
      <div>
        {console.log(this.state.rows.length)}
        <div style={{ height: 300, width: "100%" }}>
          <DataGridPro rows={rows} columns={columns} />
        </div>
      </div>
    );
  }
}
export default withRouter(Home);
