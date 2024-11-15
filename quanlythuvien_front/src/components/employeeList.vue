<template>
    <div class="shadow p-3 rounded bg-body">
      <!-- <div class="col-md-12 text-success">
        <h5> <span><i class="fa-solid fa-users"></i></span> Danh Sách Nhân Viên</h5>
        <hr>
      </div> -->
      <div v-if="employees.length > 0">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nhân Viên ID</th>
              <th scope="col">Họ Tên</th>
              <th scope="col">Ngày Sinh</th>
              <th scope="col">SĐT</th>
              <th scope="col">ID Tài Khoản</th>
              <th scope="col">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(employee, index) in employees" :key="employee.NhanVienID">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ employee.NhanVienID }}</td>
              <td>{{ employee.HoTen }}</td>
              <td>{{ employee.NgaySinh ? formatDate(employee.NgaySinh) : '' }}</td>
              <td>{{ employee.SDT }}</td>
              <td>{{ employee.ID_TaiKhoan }}</td>
              <td>
              <button class="btn btn-warning btn-sm me-2" @click="updateEmployee(employee.NhanVienID)">Sửa</button>
              <!-- <button @click="deleteEmployee(employee.NhanVienID)">Xóa</button> -->
            </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-else>Không có nhân viên nào</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      employees: {
        type: Array,
        required: true,
        default: () => []
      }
    },
    methods:{
    //   async deleteEmployee(NhanVienID) {
    //   this.$emit("employeeDeleted", NhanVienID);
    // },
    async updateEmployee(NhanVienID) {
      this.$emit("updateEmployee", NhanVienID);
      // console.log("Edit employee with ID:", NhanVienID);
    },
    formatDate(date) {
      const d = new Date(date);
      return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
    }
  },
    mounted() {
      console.log("Employee prop:", this.employees);
  },
  };
  </script>
  
  <style scoped>
  .table-hover tbody tr:hover {
    background-color: #f8f9fa;
  }
  </style>
  