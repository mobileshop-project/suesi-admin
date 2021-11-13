import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Authentication from "./Authentication";
const MySwal = withReactContent(Swal);


class Alert {

    confirmLogout() {
        return new Promise((resolve) => {
            Swal.fire({
                title: "Are you sure?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Logout",
            }).then((result) => {
                if (result.isConfirmed) {
                    Authentication.logout();
                    resolve();
                    this.getGeneralAlertMsg("success", "Logout success", "", 600);
                }
            });
        });
    }
    getLoginAlert() {
        return MySwal.fire({
            icon: "success",
            title: "Login Pass",
            showConfirmButton: false,
            timer: 1000,
        });
    }

    getLoginAlertFail() {
        return MySwal.fire({
            icon: "error",
            title: "Oops...",
            text: "Username or password does not match ",
            footer: '<a href="">Reset password?</a>',

        });
    }

    getGeneralAlertMsg(icon, titleMsg, textMsg = "", timer = 1500) {
        return MySwal.fire({
            icon: `${icon}`,
            title: `${titleMsg}`,
            text: `${textMsg}`,
            showConfirmButton: false,
            timer: ` ${timer}`,
        });
    }


 


}
export default new Alert();