import createApiClient from "./api.service";
class libraryCardService {
    constructor(baseUrl="http://localhost:3000/api/v1/libraryCard"){
        this.api = createApiClient(baseUrl);  // axios.create bên api.service
    }
    // các hàm tương tác với backend contact
    async getAll() {
         return (await this.api.get("/get")).data;
    }
    async create(data) {
        return (await this.api.post("/add", data)).data;
    }
    async getByCardNumber(id){
        return (await this.api.get(`/get/${id}`)).data;
        // return (await this.api.get("/get/:card_number")).data;
    }
    async update(id, data) {
        return (await this.api.put(`/update/${id}`, data)).data;
        // return (await this.api.put("/update/:card_number", data)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/delete/${id}`)).data;
        // return (await this.api.delete("/delete/:id")).data;
    }
}
export default new libraryCardService();