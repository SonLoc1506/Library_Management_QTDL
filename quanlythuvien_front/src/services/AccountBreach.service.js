import createApiClient from "./api.service";
class AccountBreachService {
    constructor(baseUrl="http://localhost:3000/api/v1/accountBreach"){
        this.api = createApiClient(baseUrl);  // axios.create bên api.service
    }
    // các hàm tương tác với backend contact
    async getAll() {
         return (await this.api.get("/get")).data;
    }
    async searchByName(tenhh) {
        return (await this.api.get("/", { params: { tenhh } })).data;
    }
    async create(data) {
        return (await this.api.post("/add", data)).data;
    }
    async update(id, data) {
        return (await this.api.put(`/update/${id}`, data)).data;
}
    async delete(id) {
        return (await this.api.delete(`/delete/${id}`)).data;
    }
    async getById(id){
        return (await this.api.get(`/get/${id}`)).data;
    }
}
// router.post("/add", createAccountBreach);
// router.get("/get", getAllAccountBreach);
// router.get("/get/:id", getAccountBreachById);
// router.put("/update/:id", updateAccountBreach);
// router.delete("/delete/:id", deleteAccountBreach);
export default new AccountBreachService();