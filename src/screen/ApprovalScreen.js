import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import React, { Component } from 'react'
import { withRouter } from 'react-router';
import FormCard from "../component/FormCard"
import DataService from '../service/DataService';
import { purple, red, green } from '@mui/material/colors';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import cat from "../assets/images/nyan-cat.gif";
import ApprovalService from '../service/ApprovalService';
import Authentication from '../service/Authentication';

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
            buyerCode: "",
            considerResult: "",
            remark: "",
            adminCode: "",
            buyerCode: ""
        }

    }

    async componentDidMount() {
        await this.getUser()
        await this.getShopData()


    }


    getUser() {
        const user = Authentication.getDecodeUser()
        console.log(user)
        this.setState({
            adminCode: user.accountCode

        })

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


    handleApprove() {
        this.setState({ isPopup: false })
        const { buyerCode, considerResult, remark, adminCode } = this.state
        const data = {
            buyerCode: buyerCode,
            considerResult: "APPROVE",
            remark: remark,
            adminCode: adminCode,
        }
        // Authentication.sendApprove(data)
    }


    handleReject() {

    }
    ApprovePopup(img1, img2) {
        const { imageUrl, idCardImg, selfieImg } = this.state
        const { dataWithReplaceID } = this.state

        return <div className="absolute flex flex-col bg-gray-300 z-10 rounded-md w-3/4 lg:h-5/6 h-auto   ">
            <div className="flex justify-end  ">
                <Button style={{ backgroundColor: red["A700"] }} variant="contained" onClick={() => this.setState({ isPopup: false })}> <HighlightOffIcon /></Button>
            </div>

            <div className=" flex lg:flex-row flex-col   justify-center items-center h-full lg:space-x-2  space-y-4 lg:space-y-0">
                <div className="bg-red-400">
                    <p className="font-PoppinsMedium ">Identification card</p>
                    <img className="border-4  rounded-md  md:h-96 md:w-96 w-64 h-64 " src={imageUrl + idCardImg} />
                </div>
                <div className="bg-red-400">
                    <p className="  font-PoppinsMedium">Selfie with an identification card </p>
                    <img className="border-4  rounded-md  md:h-96 md:w-96 w-64 h-64  " src={imageUrl + selfieImg} />
                </div>
            </div>


            <div className="flex justify-center space-x-10 py-4">
                <Button style={{ backgroundColor: green["A700"] }} variant="contained" onClick={() => this.handleApprove()}> Accept</Button>
                <Button style={{ backgroundColor: red["500"] }} variant="contained" onClick={() => this.setState({ isPopup: false })}> Reject</Button>
            </div>
        </div >
    }





    renderApprove() {

        const columns: GridColDef[] = [
            { field: "id", headerName: "Request id", width: 120 },
            { field: "username", headerName: "Username", width: 150 },
            { field: "requestStatus", headerName: "Status", width: 150 },
            { field: "firstname", headerName: "First name", width: 150 },
            { field: "lastname", headerName: "Last name", width: 150 },
            { field: "phoneNumber", headerName: "Phone number", width: 150 },
            {
                field: 'action',
                headerName: 'Action',
                sortable: false,
                renderCell: (params) => {

                    const onClick = (e) => {
                        console.log(params.id)

                        let x = e.stopPropagation(); // don't select this row after clicking


                        const api: GridApi = this.state.dataWithReplaceID;
                        const thisRow: Record<string, GridCellValue> = {};

                        api.filter(req => req.id === params.id).map(image => {
                            return this.setState({
                                idCardImg: image.evidenceImageList[0],
                                selfieImg: image.evidenceImageList[1],
                                buyerCode: params.id
                            })

                        })
                        this.handleDecision()
                    }

                    return <Button onClick={onClick} variant="contained" style={{ backgroundColor: green["A700"] }}  >
                        Decision
                    </Button>
                },
            },


        ];

        // const rows: GridRowsProp = [
        //     { id: 1, requestStatus: "PENDING", username: "beww" },
        //     { id: 2, requestStatus: "PENDING", username: "wave" },
        //     { id: 3, shopName: "Material-UI", col2: "is Amazing" },
        //     { id: 4, shopName: "Hello", col2: "World" },
        //     { id: 5, shopName: "XGrid", col2: "is Awesome" },
        //     { id: 6, shopName: "Material-UI2", col2: "is Amazing" },
        // ];

        const rows: GridRowsProp[] = this.state.dataWithReplaceID
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
                <FormCard background="#eeeeee" className="p-2  rounded-md">   {this.renderApprove()}  </FormCard>
                {isPopup ? this.ApprovePopup() : null}

            </div>
        )
    }
}
export default withRouter(ApprovalScreen)