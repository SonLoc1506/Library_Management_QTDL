import createApiClient from "./api.service";
class LoanBookDetailService {
    constructor(baseUrl="http://localhost:3000/api/v1//loanBookDetail"){
        this.api = createApiClient(baseUrl);  // axios.create bên api.service
    }
    // các hàm tương tác với backend contact
    async getAll() {
         return (await this.api.get("/get")).data;
    }
    async getById(id, ISBN){
        return (await this.api.get(`/get/${id}&${ISBN}`)).data;
        // return (await this.api.get("/get/:id")).data;
    }
    async update(id, ISBN, data) {
        console.log(id, ISBN, data);
        return (await this.api.put(`/update/${id}&${ISBN}`, data)).data;
        // return (await this.api.put("/update/:id", data)).data;
    }
   
}
// router.get("/get", getLoanBookDetails);
// router.get("/get/:id", getLoanBookDetailById);
// router.put("/update/:id&:ISBN_OLD", updateLoanBookDetail);
export default new LoanBookDetailService();