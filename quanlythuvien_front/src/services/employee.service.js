import createApiClient from "./api.service";
class EmployeeService {
  constructor(baseUrl="http://localhost:3000/api/v1/employee"){
      this.api = createApiClient(baseUrl);  // axios.create bên api.service
  }
  async login(data) {
    return (await this.api.post("/login", data)).data;
  }
  async getById(id){
    return (await this.api.get(`/get/${id}`)).data;
  }
  async getAll() {
    return (await this.api.get("/get")).data;
  }
  async update(id, data) {
    return (await this.api.put(`/update/${id}`, data)).data;
  }
  async delete(id) {
    return (await this.api.delete(`/delete/${id}`)).data;
  }
  // async create(data) {
  //   return (await this.api.post("/add", data)).data;
  // }
}
export default new EmployeeService();