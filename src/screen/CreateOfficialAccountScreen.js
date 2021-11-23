import axios from 'axios'
import React, { Component } from 'react'
import { withRouter,Redirect } from 'react-router-dom'
import FormCard from '../component/FormCard'
import Alert from "../service/Alert"
import AccountService from '../service/AccountService'
import Validate from "../service/Validate"
import Authentication from '../service/Authentication'

class CreateOfficialAccountScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            email: "",
            username_msg: "",
            email_msg: "",
            isRedirect: false
        }
    }

    async componentDidMount() {
        await this.getUser()
 
    }


    getUser() {
        if (Authentication.getDecodeUser() != null) {
            const user = Authentication.getDecodeUser()
            console.log(user)
            this.setState({
                accountCode: user.accountCode
            })
        } else {
            this.setState({ isRedirect: true })
        }
    }
    onChangeUsername(e) {
        let user = e.target.value;
        this.setState({ username: user });
        if (Validate.getValidateUsername(user)) {
            this.setState({ username_msg: "" });
        } else {
            this.setState({
                username_msg: "Username must be 3-15 characters and no spaces.",
            });
        }
    }


    onChangeEmail(e) {
        let email = e.target.value;
        this.setState({ email: email });
        if (Validate.getValidateEmail(email)) {
            this.setState({ email_msg: "" });
        } else {
            this.setState({ email_msg: "Invalid email!" });
        }
    }

    CheckUsername(e) {
        if (e.target.value.length > 0) {
            axios.get('https://www.tarkom-projects.com/api/v1/test/hasUsername/' + e.target.value).then(res => {
                if (res.data === true) {
                    this.setState({ user_msg: `You can't use this username : ${this.state.username}` })
                }
            })
        }
    }

    CheckEmail(e) {
        if (e.target.value.length > 0) {
            axios.get('https://www.tarkom-projects.com/api/v1/test/hasEmail/' + e.target.value).then(res => {
                if (res.data === true) {
                    this.setState({ email_msg: `You can't use this email : ${this.state.email}` })
                }
            })
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const { username, email } = this.state;

        const accountInfo = {
            username: username,
            email: email,

        };

        AccountService.sendCreateOfficialAccount(accountInfo).then(
            async (res) => {
                await console.log("send info shop  ----------------------");
                await console.log(res);
                await console.log(res.status);
                await console.log("send info shop  ----------------------");
                await this.setState({ step: res.data.step });
                await Alert.getGeneralAlertMsg("success", "Complete");
                await this.setState({ isRedirect: true });
            }
        );

    }
    renderCreateShopForm() {
        return (<form
            onSubmit={this.handleSubmit.bind(this)}
            className="flex flex-col h-full w-full  "
        >
            <div className="py-2">
                <p className="font-PoppinsMedium text-primary">
                    Create official accounts
                </p>
            </div>
            <div className="flex flex-col w-full h-full items-center space-y-2">
                <div className="flex flex-col w-full">
                    <div className="w-full justify-start mb-1">
                        <label htmlFor="username">
                            <p className="font-PoppinsMedium text-slight">Username</p>
                        </label>
                    </div>
                    <input
                        id="username"
                        name="username"
                        className="pl-2  border-gray-300 border-2 rounded-sm h-10 focus:outline-none hover:border-blue-300 w-full"
                        onChange={this.onChangeUsername.bind(this)}
                    />
                    <div
                        className={
                            "w-5/6 md:w-8/12 justify-start items-center" +
                            (this.state.username_msg ? " flex" : " hidden")
                        }
                    >
                        <p className="text-small font-PoppinsMedium text-red-500">
                            {this.state.username_msg}
                        </p>
                    </div>
                </div>
                <div className="flex flex-col w-full">
                    <div className="w-full justify-start mb-1">
                        <label htmlFor="email">
                            <p className="font-PoppinsMedium text-slight">Email</p>
                        </label>
                    </div>
                    <input
                        id="email"
                        name="email"
                        className="pl-2  border-gray-300 border-2 rounded-sm h-10 focus:outline-none hover:border-blue-300 w-full"
                        onChange={this.onChangeEmail.bind(this)}
                    />
                    <div
                        className={
                            "w-5/6 md:w-8/12 justify-start items-center" +
                            (this.state.email_msg ? " flex" : " hidden")
                        }
                    >
                        <p className="text-small font-PoppinsMedium text-red-500">
                            {this.state.email_msg}
                        </p>
                    </div>
                </div>



            </div>
            <div className="flex flex-col w-full justify-center items-center mt-20 ">
                <button
                    type="submit"
                    className="  bg-blue-500 hover:bg-blue-600 h-10 w-16 rounded-md font-PoppinsMedium text-white"
                >
                    Submit
                </button>
            </div>
        </form>)
    }

    render() {
        const { isPopup, isLoading,isRedirect } = this.state
        if (isRedirect) {
            return <Redirect to="/signin" />;
        } else {
            return (

                <div className="flex w-full h-full items-center justify-center mt-4 ">
                    <FormCard width={"35%"}
                        height={"80%"}
                        borderRadius={"5px"}
                        className="pb-10 pt-10" background="white" className="p-8  rounded-md">   {this.renderCreateShopForm()}  </FormCard>


                </div>
            )
        }
    }
}
export default withRouter(CreateOfficialAccountScreen)