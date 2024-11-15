<template>
    <div class="shadow p-3 rounded bg-body">
      <!-- <div class="col-md-12 text-success">
        <h5><span><i class="fa-solid fa-building"></i></span> Danh Sách Nhà Xuất Bản</h5>
        <hr>
      </div> -->
      <div v-if="nxbs.length > 0">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">NXB ID</th>
              <th scope="col">Tên NXB</th>
              <th scope="col">Địa Chỉ</th>
              <th scope="col">Email</th>
              <th scope="col">Người Đại Diện</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(nxb, index) in nxbs" :key="nxb.NXB_ID">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ nxb.NXB_ID }}</td>
              <td>{{ nxb.TenNXB }}</td>
              <td>{{ nxb.DiaChi }}</td>
              <td>{{ nxb.Email }}</td>
              <td>{{ nxb.Info_ngDaiDien }}</td>
              <td>
              <button class="btn btn-warning btn-sm me-2" @click="updatePublisher(nxb.NXB_ID)">Sửa</button>
              <button class="btn btn-danger btn-sm" @click="deletePublisher(nxb.NXB_ID)"><i class="fas fa-trash"></i> Xóa</button>
            </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-else>Không có nhà xuất bản nào</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      nxbs: {
        type: Array,
        required: true,
        default: () => []
      }
    },
    methods: {
    async deletePublisher(NXB_ID) {
      this.$emit("publisherDeleted", NXB_ID);
    },
    async updatePublisher(NXB_ID) {
      this.$emit("updatePublisher", NXB_ID);
    },
  },
  mounted() {
    console.log("Publishers prop:", this.nxbs);
  },
  };
  </script>
  
  <style scoped>
  .table-hover tbody tr:hover {
    background-color: #f8f9fa;
  }
  </style>  
