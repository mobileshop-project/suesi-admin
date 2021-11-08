import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import React, { Component } from 'react'
import { withRouter } from 'react-router';
import FormCard from "../component/FormCard"
import DataService from '../service/DataService';
import EditIcon from "@material-ui/icons/Edit";


class ShopList extends Component {
    constructor(props) {

        super(props);

        this.state = {
            DataWithReplaceID: null
        }

    }

    async componentDidMount() {
        await this.getShopData()

    }


    getShopData() {
        DataService.fetchShopData().then(async (res) => {
            await this.ReplaceId(res.data)

        })
    }




    ReplaceId(jsonObj) {
        let json = jsonObj
        let newJson = JSON.parse(JSON.stringify(json).split('"shopCode":').join('"id":'));
        console.log(newJson)
        this.setState({
            DataWithReplaceID: newJson
        })
    }


    renderShop() {
        const columns: GridColDef[] = [
            { field: "shopName", headerName: "Shop name", width: 150 },
            { field: "shopType", headerName: "Shop type", width: 150 },
            { field: "col3", headerName: "Status", width: 150 },
            {
                field: "edit",
                headerName: "Action",
                sortable: false,
                width: 130,
                disableClickEventBubbling: true,
                renderCell: () => {
                    return (
                        <Button variant="contained" color="primary"  >
                            OPEN
                        </Button>
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
        return (

            <div className="flex items-center justify-center mt-4">
                {/* <button onClick={() => this.getShopData()}>aaaaa</button> */}
                <FormCard className="p-2  rounded-md">   {this.renderShop()}  </FormCard>


            </div>
        )
    }
}
export default withRouter(ShopList);