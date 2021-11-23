class Validate {
    getValidateShopName(shopName) {
        const shopNameCheck = /^[a-zA-Z0-9]{1,35}$/;

        if (shopName.match(" ") || "") {
            return false;
        } else if (shopName.match(shopNameCheck)) {
            return true;
        } else {
            return false;
        }
    }

    getGeneralValidate(text) {
        const textCheck = /^(?!\s*$).+/;

        if (text.match(" ") || "") {
            return false;
        } else if (text.match(textCheck)) {
            return true;
        } else {
            return false;
        }
    }


    getValidateUsername(username) {
        const userCheck = /^[a-zA-Z0-9._-]{3,15}$/;
        if (username.match(" ") || "") {
            return false;
        } else if (username.match(userCheck)) {
            return true;
        } else {
            return false;
        }
    }

    getValidateEmail(email) {
        const emailCheck = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        if (email.match(" ") || "") {
            return false;
        } else if (email.match(emailCheck)) {
            return true;
        } else {
            return false;
        }
    }

}
export default new Validate();