import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import React, { Component } from 'react'
import { withRouter } from 'react-router';
import FormCard from "../component/FormCard"
import DataService from '../service/DataService';
 
import {  green } from '@mui/material/colors';
 


class UserListScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            DataWithReplaceID: null
        }

    }

    async componentDidMount() {
        await this.getUserData()


    }

    getUserData() {
        DataService.fetchUserData().then(async (res) => {
            await this.ReplaceId(res.data)

        })
    }

    ReplaceId(jsonObj) {
        let json = jsonObj
        let newJson = JSON.parse(JSON.stringify(json).split('"appAccountCode":').join('"id":'));
        console.log(newJson)
        this.setState({
            DataWithReplaceID: newJson
        })
        // this.convertRole(newJson)
    }


    convertRole(newJson) {
        const rows1 = newJson
        const rows2 = newJson

    //    let x = delete rows1.roles;
        console.log("--------rows1-------------")
     
        console.log(rows2)
        const list1 = rows2.map(user => {
            return  user.roles
 
        });
        console.log(rows1.map(obj => delete rows1.roles ));
        const list2 = list1.map(roles => {
            return {
                roles: roles[0]  
            }
        });

        var merged = {};
        Object.assign(merged, rows1, list2);

        // const detailsRows = rows.map((row) => {

        //     return {

        //         roles: row.roles

        //     }
        // })


        console.log(list1)
        console.log(list2)
        console.log(merged)
    }

    renderShop() {


        const columns: GridColDef[] = [
            { field: "id", headerName: "id", width: 80 },
            { field: "username", headerName: "username", width: 150 },
            { field: "role", headerName: "role", width: 150 },
            { field: "active", headerName: "active", width: 150 },
            { field: "email", headerName: "email", width: 150 },
            {
                field: "edit",
                headerName: "Action",
                sortable: false,
                width: 130,
                disableClickEventBubbling: true,
                renderCell: () => {
                    return (
                        <Button variant="contained" style={{ backgroundColor: green["A700"] }}  >
                            OPEN
                        </Button>
                    );
                }
            }, {
                field: 'fullName',
                headerName: 'Full name',
                description: 'This column has a value getter and is not sortable.',
                sortable: false,
                width: 160,
                valueGetter: (params) =>
                    `${params.getValue(params.id, 'username') || ''}  `,
            },

        ];



        // const rows: GridRowsProp = [
        //     { id: 1, username: "Hello", col2: "World" },
        //     { id: 2, username: "XGrid", col2: "is Awesome" },
        //     { id: 3, username: "Material-UI", col2: "is Amazing" },
        //     { id: 4, username: "Hello", col2: "World" },
        //     { id: 5, username: "XGrid", col2: "is Awesome" },
        //     { id: 6, username: "Material-UI2", col2: "is Amazing" },
        //     { id: 7, username: "Hello", col2: "World" },
        //     { id: 8, username: "XGrid", col2: "is Awesome" },
        //     { id: 9, username: "Material-UI", col2: "is Amazing" },
        //     { id: 10, username: "Hello", col2: "World" },
        //     { id: 11, username: "XGrid", col2: "is Awesome" },
        //     { id: 12, username: "Material-UI2", col2: "is Amazing" },

        // ];



        const rows: GridRowsProp[] = this.state.DataWithReplaceID


        return (
            <div style={{ height: 750, width: "100%" }}>
                <DataGrid rows={rows} columns={columns} />
            </div>
        )

    }

    render() {
        return (

            <div className="flex items-center justify-center mt-4">
                {/* <button onClick={() => this.getUserData()}>aaaaa</button> */}
                <FormCard background="#eeeeee" className="p-2  rounded-md ">   {this.renderShop()}  </FormCard>


            </div>
        )
    }
}
export default withRouter(UserListScreen)