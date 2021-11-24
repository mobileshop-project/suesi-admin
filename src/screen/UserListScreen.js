import { DataGrid } from '@mui/x-data-grid';
import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom';
import DataService from '../service/DataService';
import cat from "../assets/images/nyan-cat.gif";
import Authentication from '../service/Authentication';

class UserListScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            DataWithReplaceID: null,
            isLoading: true,
            isRedirect: false
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
        if (Authentication.getDecodeUser() != null) {
            const user = Authentication.getDecodeUser()
            this.setState({
                accountCode: user.accountCode
            })
        } else {
            this.setState({ isRedirect: true })
        }
    }

    ReplaceId(jsonObj) {
        let json = jsonObj
        let newJson = JSON.parse(JSON.stringify(json).split('"accountCode":').join('"id":'));
        this.setState({
            DataWithReplaceID: newJson,
            isLoading: false,
            isRedirect: false
        })
    }

    renderUser() {


        const columns: GridColDef[] = [
            { field: "id", headerName: "Id", headerAlign: 'center', width: 100 },
            { field: "username", headerName: "username", headerAlign: 'center', width: 500 },
            { field: "role", headerName: "role", headerAlign: 'center', width: 200 },
            { field: "active", headerName: "active", headerAlign: 'center', width: 150 },
            { field: "email", headerName: "email", headerAlign: 'center', width: 200 },
        ];
        const rows: GridRowsProp[] = this.state.DataWithReplaceID
        return (
            <div style={{ height: "100%", width: "100%" }}>
                <DataGrid rows={rows} columns={columns} className="bg-white" />
            </div>
        )
    }

    render() {
        const { isLoading, isRedirect } = this.state
        if (isRedirect) {
            return <Redirect to="/signin" />;
        } else {
            return (isLoading ?
                <div className="flex flex-col w-full h-full justify-center items-center">
                    <div className="flex absolute">
                        <img
                            src={cat}
                            alt="cat"
                            className="flex justify-center items-center m-auto"
                        />
                    </div>
                </div> :

                <div className="flex w-full h-full items-center justify-center mt-4  ">
                   {this.renderUser()}
                </div>
            )
        }
    }
}
export default withRouter(UserListScreen)