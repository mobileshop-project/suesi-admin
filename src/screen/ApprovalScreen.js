import {DataGrid} from '@mui/x-data-grid';
import {Button} from '@mui/material';
import React, {Component} from 'react'
import {withRouter} from 'react-router';
import DataService from '../service/DataService';
import {red, green} from '@mui/material/colors';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import cat from "../assets/images/nyan-cat.gif";
import ApprovalService from '../service/ApprovalService';
import Authentication from '../service/Authentication';
import Swal from "sweetalert2";

class ApprovalScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataWithReplaceID: null,
      isPopup: false,
      imageUrl: "https://www.tarkom-projects.com/api/v1/image/",
      idCardImg: null,
      selfieImg: null,
      isLoading: true,
      considerResult: "",
      remark: "",
      adminCode: "",
      buyerCode: "",
      isRedirect: false
    }
  }

  async componentDidMount() {
    await this.getUser()
    await this.getShopData()
  }


  getUser() {
    if (Authentication.getDecodeUser() != null) {
      const user = Authentication.getDecodeUser()
      console.log(user)
      this.setState({
        accountCode: user.accountCode,
        adminCode:user.accountCode
      })
    } else {
      this.setState({isRedirect: true})
    }
  }

  getShopData() {
    DataService.fetchApproveData().then(async (res) => {
      console.log(res.data)
      console.log("----------------")
      await this.ReplaceId(res.data)
    })
  }

  ReplaceId(jsonObj) {
    let json = jsonObj
    let newJson = JSON.parse(JSON.stringify(json).split('"requestCode":').join('"id":'));
    console.log(newJson)
    this.setState({
      dataWithReplaceID: newJson,
      isLoading: false
    })
  }

  async handleDecision() {
    this.setState({
      isPopup: true
    })
    console.log(this.state.buyerCode)
  }

  async handleApprovalResponse(Result) {
    await this.setState({isPopup: false})
    const {buyerCode, remark, adminCode} = await this.state

    if (Result === "APPROVE") {
      const data = {
        buyerCode: buyerCode,
        considerResult: "APPROVE",
        remark: remark,
        adminCode: adminCode,
      }
      ApprovalService.sendApprove(data)
    } else if (Result === "REJECT") {
      await this.getRejectAlert()
      const data = {
        buyerCode: buyerCode,
        considerResult: "REJECT",
        remark: this.state.remark, //receive new state
        adminCode: adminCode,
      }
      ApprovalService.sendApprove(data)
    }
  }

  async getRejectAlert() {
    const inputOptions = {
      'blurry picture': 'blurry picture',
      'Incorrect information': 'Incorrect information',
      'Information not match': 'Information not match'
    }

    const {value: reason} = await Swal.fire({
      title: 'Reason for reject',
      input: 'radio',
      inputOptions: inputOptions,
      confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> Reject!',
      confirmButtonColor: '#f44336',
      inputValidator: (value) => {
        if (!value) {
          return 'You need to choose something!'
        }
      }
    })

    if (reason) {
      this.setState({
        remark: reason
      })
    }
  }

  ApprovePopup() {
    const {imageUrl, idCardImg, selfieImg} = this.state

    return <div className="absolute flex flex-col bg-white z-10 rounded-md w-3/4 lg:h-5/6 h-auto shadow-2xl">
      <div className="flex justify-end  ">
        <Button style={{backgroundColor: red["A700"], boxShadow: "none", borderTopRightRadius: "6px" }} variant="contained"
                onClick={() => this.setState({isPopup: false})}> <HighlightOffIcon/></Button>
      </div>

      <div className=" flex lg:flex-row flex-col justify-center items-center h-full lg:space-x-2 space-y-4 lg:space-y-0">
        <div className="flex flex-col w-4/12 justify-center items-center space-y-5">
          <p className="font-PoppinsMedium text-sub-header">Identification card</p>
          <img className="border-2 rounded-md" src={imageUrl + idCardImg} alt="img"/>
        </div>
        <div className="flex flex-col w-4/12 justify-center items-center space-y-5">
          <p className="font-PoppinsMedium text-sub-header">Selfie with an identification card </p>
          <img className="border-2 rounded-md" src={imageUrl + selfieImg} alt="img"/>
        </div>
      </div>

      <div className="flex justify-center space-x-10 py-4">
        <Button style={{backgroundColor: green["A700"]}} variant="contained"
                onClick={() => this.handleApprovalResponse("APPROVE")}> Accept</Button>
        <Button style={{backgroundColor: red["500"]}} variant="contained"
                onClick={() => this.handleApprovalResponse("REJECT")}> Reject</Button>
      </div>
    </div>
  }

  renderApprove() {
    const columns: GridColDef[] = [
      {field: "id", headerName: "Request id", headerAlign: 'center', width: 100},
      {field: "username", headerName: "Username", headerAlign: 'center', width: 150},
      {field: "requestStatus", headerName: "Status", headerAlign: 'center', width: 200},
      {field: "firstname", headerName: "First name", headerAlign: 'center', width: 300},
      {field: "lastname", headerName: "Last name", headerAlign: 'center', width: 300},
      {field: "phoneNumber", headerName: "Phone number", headerAlign: 'center', width: 150},
      {
        field: 'action',
        headerName: 'Action',
        sortable: false,
        renderCell: (params) => {
          const onClick = (e) => {
            e.stopPropagation(); // don't select this row after clicking
            const api: GridApi = this.state.dataWithReplaceID;
            api.filter(req => req.id === params.id).map(data => {
              return this.setState({
                idCardImg: data.evidenceImageList[0],
                selfieImg: data.evidenceImageList[1],
                buyerCode: data.accountCode
              })
            })
            this.handleDecision()
          }
          return <Button onClick={onClick} variant="contained" style={{backgroundColor: green["A700"]}}>
            Decision
          </Button>
        },
      },
    ];

    const rows: GridRowsProp[] = this.state.dataWithReplaceID
    return <div style={{height: "100%", width: "100%"}}>
      <DataGrid rows={rows} columns={columns} className="bg-white"/>
    </div>
  }

  render() {
    const {isPopup, isLoading} = this.state
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
          {this.renderApprove()}
          {isPopup ? this.ApprovePopup() : null}
        </div>
    )
  }
}

export default withRouter(ApprovalScreen)