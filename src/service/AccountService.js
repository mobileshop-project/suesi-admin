import api from "./api";
class AccountService {
    sendCreateOfficialAccount(data) {
        console.log(data)
        var formData = new FormData();
        const officialInfo = JSON.stringify(data)
        formData.append("officialForm", officialInfo)
        return api.post("admin/genOfficialSeller", formData)
    }
}
export default new AccountService();
