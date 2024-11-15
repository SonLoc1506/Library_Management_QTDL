import createApiClient from "./api.service";
class ThongKe {
    constructor(baseUrl = "http://localhost:3000/api/v1/thongke") {
        this.api = createApiClient(baseUrl);  // axios.create bên api.service
    }
    // các hàm tương tác với backend contact
    async get(data) {
        return (await this.api.post("/thongkemuonsach", data)).data;
    }

}

export default new ThongKe();