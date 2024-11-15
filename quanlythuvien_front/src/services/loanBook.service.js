import createApiClient from "./api.service";
class LoanBookService {
    constructor(baseUrl="http://localhost:3000/api/v1/loanbook"){
        this.api = createApiClient(baseUrl);  // axios.create bên api.service
    }
    // các hàm tương tác với backend contact
    async getAll() {
         return (await this.api.get("/get")).data;
    }
    async create(data) {
        return (await this.api.post("/add", data)).data;
    }
    async getById(id){
        return (await this.api.get(`/get/${id}`)).data;
        // return (await this.api.get("/get/:id")).data;
    }
    async update(id, data) {
        return (await this.api.put(`/update/${id}`, data)).data;
        // return (await this.api.put("/update/:id", data)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/delete/${id}`)).data;
        // return (await this.api.delete("/delete/:id")).data;
    }
}
// router.post("/add", addLoanBook);
// router.get("/get", getLoanBooks);
// router.get("/get/:id", getLoanBookById);
// router.put("/update/:id", updateLoanBook);
// router.delete("/delete/:id", deleteLoanBook);

export default new LoanBookService();