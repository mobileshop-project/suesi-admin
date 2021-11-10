import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import React, { Component } from 'react'
import { withRouter } from 'react-router';
import FormCard from "../component/FormCard"
import DataService from '../service/DataService';
import EditIcon from "@material-ui/icons/Edit";
import { purple, red, green } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import Swal from 'sweetalert2';


class ApprovalScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataWithReplaceID: null,
            isPopup: false,
            imageUrl: "https://www.tarkom-projects.com/api/v1/image/",
            idCardImg: null,
            selfieImg: null
        }

    }

    async componentDidMount() {
        await this.getShopData()
        await this.test()

    }

    getShopData() {
        DataService.fetchApproveData().then(async (res) => {
            console.log(res.data)
            console.log("----------------")
            await this.ReplaceId(res.data)
            await this.test2()
        })
    }

    ReplaceId(jsonObj) {
        let json = jsonObj
        let newJson = JSON.parse(JSON.stringify(json).split('"requestCode":').join('"id":'));
        console.log(newJson)
        this.setState({
            dataWithReplaceID: newJson
        })
    }


    renderImage = () => {
        return (<div>555555555555555555555555</div>)
    }


    test() {
        let a = [{ username: "bew", roles: [{ role: "Buyer" }, { role: "Seller" }] },
        { username: "wave", roles: [{ role: "Buyer" }, { role: "Seller" }] }]
        // [[1, 2], [3, 4], [5, 6]]


        a.map(item => {
            return item.roles.map((sub) => {
                console.log(sub.role)
            });

        })

    }

    test2() {
        const imageUrl = "https://www.tarkom-projects.com/api/v1/image/"
        const { dataWithReplaceID } = this.state
        console.log(dataWithReplaceID)
        dataWithReplaceID.map((list1) => {
            return list1.evidenceImageList.map(list2 => {
                return <div> <img scr={imageUrl + list2} />   </div>
            })
        })


    }





    Approve() {

        const allImage = []
        //  const data = this.state.dataWithReplaceID
        const data = [{ id: 1, requestStatus: "PENDING", username: "beww", pic: [{ img: "https://static.thairath.co.th/media/dFQROr7oWzulq5Fa4u0YhLKiDxsd9SJzhOgnJBrNJdI8TIgXYL2SYUqzV3k4hxCfnH5.jpg" }, { img: "https://s.isanook.com/wo/0/ud/4/20927/d21.jpg" }] },
        { id: 2, requestStatus: "PENDING", username: "wave", pic: [{ img: "https://static.thairath.co.th/media/dFQROr7oWzulq5Fa4u0YhLKiDxsd9SJzhOgnJBrNJdI8TIgXYL2SYUqzV3k4hxCfnH5.jpg" }, { img: "https://s.isanook.com/wo/0/ud/4/20927/d21.jpg" }] },]


        // data.map(item => {
        //     return item.pic.map((sub) => {
        //         console.log(sub.img)

        //     });

        // })



    }




    handleDecision() {
        this.setState({
            isPopup: true
        })
        console.log(this.state.isPopup)
    }


    ApprovePopup(img1, img2) {

        const { dataWithReplaceID } = this.state

        return <div className="absolute flex    bg-white z-10 rounded-md">
            <div>

                <img className="w-7/12" src={img1} />

            </div>
            <div>
                <img src={img2} />
                <img src="https://s.isanook.com/wo/0/ud/4/20927/d21.jpg" />
            </div>
        </div>
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
                        let x =
                            e.stopPropagation(); // don't select this row after clicking

                        const api: GridApi = this.state.dataWithReplaceID;
                        const thisRow: Record<string, GridCellValue> = {};

                        api.filter(req => req.id === params.id).map(image => {
                            return this.setState({
                                idCardImg: image.evidenceImageList[0],
                                selfieImg: image.evidenceImageList[1],
                            })

                        })


                    };







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
        const { isPopup } = this.state
        return (

            <div className="flex w-full h-full items-center justify-center mt-4  ">

                <FormCard background="#eeeeee" className="p-2  rounded-md">   {this.renderApprove()}  </FormCard>
                {isPopup ? this.ApprovePopup() : null}

            </div>
        )
    }
}
export default withRouter(ApprovalScreen)