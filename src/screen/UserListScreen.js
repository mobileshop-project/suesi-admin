import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import React, { Component } from 'react'
import { withRouter } from 'react-router';
import FormCard from "../component/FormCard"
import DataService from '../service/DataService';
import cat from "../assets/images/nyan-cat.gif";
import { green } from '@mui/material/colors';
import Authentication from '../service/Authentication';



class UserListScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            DataWithReplaceID: null,
            isLoading: true
        }

    }

    async componentDidMount() {
        await this.getUser()
        await this.getUserListData()


    }

    getUserListData() {
        DataService.fetchUserData().then(async (res) => {
            await this.ReplaceId(res.data)

        })
    }

    getUser() {
        const user = Authentication.getDecodeUser()
        console.log(user)
        this.setState({
            accountCode: user.accountCode
        })

    }

    ReplaceId(jsonObj) {
        let json = jsonObj
        let newJson = JSON.parse(JSON.stringify(json).split('"accountCode":').join('"id":'));
        console.log(newJson)
        this.setState({
            DataWithReplaceID: newJson,
            isLoading: false
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
            return user.roles

        });
        console.log(rows1.map(obj => delete rows1.roles));
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

    renderUser() {


        const columns: GridColDef[] = [
            { field: "id", headerName: "Id", width: 80 },
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
                            Active
                        </Button>
                    );
                }
            } 

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
        const { isPopup, isLoading } = this.state
        return (isLoading ?
            <div className="flex flex-col w-full h-full bg-opacity-20 transition-opacity justify-center items-center">
                <div className="flex absolute">
                    <img
                        src={cat}
                        alt="cat"
                        className="flex justify-center items-center m-auto"
                    />
                </div>
            </div> :

            <div className="flex w-full h-full items-center justify-center mt-4  ">
                <FormCard background="#eeeeee" className="p-2  rounded-md">   {this.renderUser()}  </FormCard>


            </div>
        )
    }
}
export default withRouter(UserListScreen)