import api from "./api";
 

class DataService {
    fetchShopData() {
        return api.get("shop?pageSize=100")
    }

    fetchUserData() {
        return api.get("user?pageSize=100")
    }
    fetchApproveData() {
        return api.get("admin/considerSeller?pageSize=100")
    }
}
export default new DataService()