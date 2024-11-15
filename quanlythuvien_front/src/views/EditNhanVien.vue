<template>
  <div>
    <AppHeaderAdmin :session_admin="session_admin" />
    <main>
      <div v-if="employee !== null">
        <div class="container phancach mt-10">
          <div class="pchr">
            <hr style="width: 5rem;flex-grow: 1; height: 3px; margin-right: 1rem;">
          </div>
          <h5 class="mb-2 text-giohang">Chỉnh Sửa Nhân Viên</h5>
          <div class="pchr">
            <hr style="width: 5rem;flex-grow: 1; height: 3px;margin-left: 1rem;">
          </div>
        </div>

        <div class="container">
          <form @submit.prevent="updateEmployee">
            <div class="form-group">
              <label>Mã Nhân Viên</label>
              <input type="text" class="form-control" v-model="employee.NhanVienID" readonly>
            </div>

            <div class="form-group">
              <label>Họ Tên</label>
              <input type="text" class="form-control" v-model="employee.HoTen" required>
            </div>

            <div class="form-group">
              <label>Ngày Sinh</label>
              <input type="date" class="form-control" v-model="employee.NgaySinh" required>
            </div>

            <div class="form-group">
              <label>Số Điện Thoại</label>
              <input type="tel" class="form-control" v-model="employee.SDT" required>
            </div>

            <div class="form-group">
              <label>ID Tài Khoản</label>
              <input type="text" class="form-control" v-model="employee.ID_TaiKhoan" readonly>
            </div>

            <div class="mt-3">
              <button type="submit" class="btn btn-primary me-2">Cập Nhật</button>
              <!-- <button type="button" class="btn btn-danger" @click="deleteEmployee">Xóa</button> -->
            </div>
          </form>
        </div>

        <p class="text-success">{{ message }}</p>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
    </main>
    <AppFooterAdmin/>
  </div>
</template>

<script>
import AppHeaderAdmin from "@/components/AppHeaderAdmin.vue";
import AppFooterAdmin from "@/components/AppFooterAdmin.vue";
import EmployeeService from "@/services/employee.service";

export default {
  components: {
    AppHeaderAdmin,
    AppFooterAdmin
  },
  props: ["session_admin"],
  data() {
    return {
      employee: null,
      message: ""
    };
  },
  methods: {
    async getEmployees() {
      try {
        const id = this.$route.params.id;
        const response = await EmployeeService.getById(id);
        
        if (response && response.data) {
          this.employee = response.data[0];
        } else {
          throw new Error("Invalid employee data received");
        }
      } catch (error) {
        console.log(error);
        this.$router.push("/notfound");
      }
    },
    async updateEmployee() {
      try {
        const { HoTen, NgaySinh, SDT, ID_TaiKhoan } = this.employee;
        if (!HoTen || !NgaySinh || !SDT || !ID_TaiKhoan) {
          throw new Error("Vui lòng điền đầy đủ thông tin");
        }

        const response = await EmployeeService.update(this.employee.NhanVienID, {
          HoTen,
          NgaySinh,
          SDT,
          ID_TaiKhoan
        });
        console.log(response);


        if (response && response.status === 200) {
          this.message = "Nhân viên đã được cập nhật thành công.";
          alert(this.message);
          await this.getEmployees();
          this.$router.push("/danhsachnhanvien");
        } else {
          throw new Error("Cập nhật thất bại");
        }
      } catch (error) {
        console.log(error);
        alert(error.message || "Có lỗi xảy ra khi cập nhật nhân viên");
      }
    },
    // async deleteEmployee() {
    //   if (confirm("Bạn muốn xóa nhân viên này?")) {
    //     try {
    //       const response = await EmployeeService.delete(this.employee.NhanVienID);
    //       if (response && response.status === 200) {
    //         alert("Xóa thành công");
    //         this.$router.push("/danhsachnhanvien");
    //       } else {
    //         throw new Error("Xóa thất bại");
    //       }
    //     } catch (error) {
    //       console.log(error);
    //       alert("Có lỗi xảy ra khi xóa nhân viên");
    //     }
    //   }
    // }
  },
  created() {
    this.getEmployees();
  }
};
</script>

<style>
.text-giohang {
  font-size: 3rem;
  color: #659fa5;
}
.phancach {
  margin-top: 3rem;
}
.form-group {
  margin-bottom: 1rem;
}
</style>