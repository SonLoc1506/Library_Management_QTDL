// tao nguoi dung
// dang nhap
import createApiClient from "./api.service";
class KhachHangService {
  constructor(baseUrl="http://localhost:3000/api/v1/auth"){
      this.api = createApiClient(baseUrl);  // axios.create bên api.service
  }
  // các hàm tương tác với backend contact
  async login(data) {
    console.log(data);
    return (await this.api.post("/login", data)).data;
  }
  async register(data) {
    return (await this.api.post("/register", data)).data;
  }
  async getAll() {
    return (await this.api.get("/get")).data;
  }
  // async create(data) {
  //   return (await this.api.post("/add", data)).data;
  // }
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
export default new KhachHangService();