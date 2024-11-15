import createApiClient from "./api.service";
class BookService {
    constructor(baseUrl="http://localhost:3000/api/v1/book"){
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
    async update(ISBN, data) {
        return (await this.api.put(`/update/${ISBN}`, data)).data;
}
    async delete(id) {
        return (await this.api.delete(`/delete/${id}`)).data;
    }
    async getALLBookTheoLoai(idloai) {
        return (await this.api.get(`/loaihang/${idloai}`)).data;
    }
    async getById(id){
        return (await this.api.get(`/get/${id}`)).data;
    }
}
// router.post("/add", addBook);
// router.get("/get", getBooks);
// router.get("/get/:id", getBookById);
// router.put("/update/:id", updateBook);
// router.delete("/delete/:id", deleteBook);  
export default new BookService();