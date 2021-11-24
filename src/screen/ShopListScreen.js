import {DataGrid} from '@mui/x-data-grid';
import React, {Component} from 'react'
import {withRouter} from 'react-router-dom';
import DataService from '../service/DataService';
import cat from "../assets/images/nyan-cat.gif";
import Authentication from '../service/Authentication';

class ShopList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DataWithReplaceID: null,
      isLoading: true,
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
    if (Authentication.getDecodeUser() != null) {
      const user = Authentication.getDecodeUser()
      this.setState({
        accountCode: user.accountCode
      })
    }
  }

  ReplaceId(jsonObj) {
    let json = jsonObj
    let newJson = JSON.parse(JSON.stringify(json).split('"shopCode":').join('"id":'));
    this.setState({
      DataWithReplaceID: newJson,
      isLoading: false
    })
  }

  renderShop() {
    const columns: GridColDef[] = [
      {field: "id", headerName: "Shop id", headerAlign: 'center', width: 100},
      {field: "shopName", headerName: "Shop name", headerAlign: 'center', width: 750},
      {field: "shopType", headerName: "Shop type", headerAlign: 'center', width: 300},
      {field: "shopStatus", headerName: "Status", headerAlign: 'center', width: 150},
    ];
    const rows: GridRowsProp[] = this.state.DataWithReplaceID
    return <div style={{height: "100%", width: "100%"}}>
      <DataGrid rows={rows} columns={columns} className="bg-white"/>
    </div>
  }

  render() {
    const {isLoading} = this.state
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
        <div className="flex w-full h-full items-center justify-center mt-4 ">
          {this.renderShop()}
        </div>
    )
  }
}

export default withRouter(ShopList);