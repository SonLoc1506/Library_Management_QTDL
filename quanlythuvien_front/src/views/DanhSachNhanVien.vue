<template>
  <div>
    <AppHeaderAdmin :session_admin="session_admin" />
    <main class="main-admin">
      <div id="hdsd">
        <div class="col-4 offset-1 mt-3 danhsachsanpham">
          <InputSearchAdmin v-model="searchText" />
        </div>
      </div>
      <div class="row">
        <div class="col-10 mt-3 offset-1">
          <div class="shadow p-3 rounded bg-body">
            <div class="col-md-12 text-primary">
              <h5>
                <span><i class="fa-solid fa-users"></i></span> Danh mục Nhân Viên
              </h5>
              <hr />
            </div>
            <employeeList
              :employees="filteredEmployees"
              @employeeDeleted="removeEmployeeFromList"
              @updateEmployee="updateEmployee"
            />
          </div>
          <div class="row mb-3 thanhbutton">
            <button
              class="btn btn-sm btn-primary col-2 m-3"
              @click="refreshList"
            >
              <i class="fas fa-redo"></i> Làm mới
            </button>
            <!-- <button
              class="btn btn-sm btn-success col-2 m-3"
              @click="goToAddEmployee"
            >
              <i class="fas fa-plus"></i> Thêm mới
            </button> -->
            <!-- <button
              class="btn btn-sm btn-danger col-2 m-3"
              @click="removeAllEmployees"
            >
              <i class="fas fa-trash"></i> Xóa tất cả
            </button> -->
          </div>
        </div>
      </div>
    </main>
    <AppFooterAdmin />
  </div>
</template>

<script>
import AppHeaderAdmin from "@/components/AppHeaderAdmin.vue";
import AppFooterAdmin from "@/components/AppFooterAdmin.vue";
import employeeList from "@/components/employeeList.vue";
import InputSearchAdmin from "@/components/InputSearchAdmin.vue";
// import axios from "axios";
import EmployeeService from "@/services/employee.service";

export default {
  components: {
    AppHeaderAdmin,
    AppFooterAdmin,
    InputSearchAdmin,
    employeeList,
  },
  data() {
    return {
      employees: [],
      searchText: "",
      add: false,
      mode: "create",
      session_admin: null
    };
  },
  computed: {
    filteredEmployees() {
      if (!this.searchText) return this.employees;
      const searchTextLower = this.searchText.toLowerCase();
      return this.employees.filter((employee) =>
        employee.HoTen.toLowerCase().includes(searchTextLower)
      );
    },
  },
  methods: {
    async refreshList() {
      try {
        const response = await EmployeeService.getAll();
        console.log(response);
        this.employees = response.data;
        console.log(this.employees);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    },
    goToAddEmployee() {
      this.$router.push('/addemployee');
    },
    async removeEmployeeFromList(id) {
      if (confirm("Bạn muốn xóa nhân viên này?")) {
        try {
          await EmployeeService.delete(id);
          this.employees = this.employees.filter((employee) => employee.NhanVienID !== id);
        } catch (err) {
          console.log(err);
        }
      }
    },
    async updateEmployee(id) {
      if (confirm("Bạn muốn sửa nhân viên này?")) {
        this.$router.push(`/editnhanvien/${id}`);  
      }
    },
  },
  mounted() {
    this.refreshList(); // Gọi khi trang được tải
  },
};
</script>
