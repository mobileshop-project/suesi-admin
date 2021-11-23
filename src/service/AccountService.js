import api from "./api";
const API_URL = "https://www.tarkom-projects.com/api/v1/";

class AccountService {
    sendBasicShopInformation(data, accountCode) {
        var formData = new FormData();
        const shopInfo = JSON.stringify(data);
        formData.append("setupShopFrom", shopInfo);
        return api.post("shop/" + accountCode + "/setup", formData);
    }
    
    sendCreateOfficialAccount(data) {
        console.log(data)
        var formData = new FormData();
        const officialInfo = JSON.stringify(data)
        formData.append("officialForm", officialInfo)
        return api.post("admin/genOfficialSeller", formData)

    }

}
export default new AccountService();
