import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import React, { Component } from 'react'
import { withRouter } from 'react-router';
import FormCard from "../component/FormCard"
import DataService from '../service/DataService';
import EditIcon from "@material-ui/icons/Edit";
import { purple, red, green } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import cat from "../assets/images/nyan-cat.gif";
import Authentication from '../service/Authentication';

class ShopList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            DataWithReplaceID: null,
            isLoading: true
        }

    }

    async componentDidMount() {
        await this.getUser()
        await this.getShopData()

    }

    getShopData() {
        DataService.fetchShopData().then(async (res) => {
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
        let newJson = JSON.parse(JSON.stringify(json).split('"shopCode":').join('"id":'));
        console.log(newJson)
        this.setState({
            DataWithReplaceID: newJson,
            isLoading: false
        })
    }


    renderShop() {


        const columns: GridColDef[] = [
            { field: "id", headerName: "Shop id", width: 80 },
            { field: "shopName", headerName: "Shop name", width: 150 },
            { field: "shopType", headerName: "Shop type", width: 150 },
            { field: "shopStatus", headerName: "Status", width: 150 },
            {
                field: "edit",
                headerName: "Action",
                sortable: false,
                width: 130,
                disableClickEventBubbling: true,
                renderCell: () => {
                    return (
                        <div>
                            <Button variant="contained" style={{ backgroundColor: green["A700"] }}  >
                                OPEN
                            </Button>
                        </div>

                    );
                }
            }

        ];

        // const rows: GridRowsProp = [
        //     { id: 1, shopName: "Hello", col2: "World" },
        //     { id: 2, shopName: "XGrid", col2: "is Awesome" },
        //     { id: 3, shopName: "Material-UI", col2: "is Amazing" },
        //     { id: 4, shopName: "Hello", col2: "World" },
        //     { id: 5, shopName: "XGrid", col2: "is Awesome" },
        //     { id: 6, shopName: "Material-UI2", col2: "is Amazing" },
        // ];

        const rows: GridRowsProp[] = this.state.DataWithReplaceID
        return <div style={{ height: 750, width: "100%" }}>
            <DataGrid rows={rows} columns={columns} />
        </div>
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
                <FormCard background="#eeeeee" className="p-2  rounded-md">   {this.renderShop()}  </FormCard>
            

            </div>
        )
    }
}
export default withRouter(ShopList);