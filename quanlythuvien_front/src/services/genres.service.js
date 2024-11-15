import createApiClient from "./api.service";
class genresService {
  constructor(baseUrl = "http://localhost:3000/api/v1/genres") {
    this.api = createApiClient(baseUrl); // axios.create bên api.service
  }
  // các hàm tương tác với backend contact
  async getAll() {
    return (await this.api.get("/get")).data;
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
  async getById(id) {
    return (await this.api.get(`/get/${id}`)).data;
  }
}
export default new genresService();
