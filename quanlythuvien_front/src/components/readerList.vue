<template>
    <div class="shadow p-3 rounded bg-body">
      <div v-if="readers.length > 0">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Mã Độc Giả</th>
              <th scope="col">Tên Độc Giả</th>
              <th scope="col">Địa Chỉ</th>
              <th scope="col">SĐT</th>
              <th scope="col">Số Thẻ</th>
              <th scope="col">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(reader, index) in readers" :key="reader.DocGia_ID">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ reader.DocGiaID }}</td>
              <td>{{ reader.TenDocGia }}</td>
              <td>{{ reader.DiaChi }}</td>
              <td>{{ reader.SDT }}</td>
              <td>{{ reader.SoThe }}</td>
              <td>
              <button class="btn btn-warning btn-sm me-2" @click="updateReader(reader.DocGiaID)">Sửa</button>
              <button class="btn btn-danger btn-sm" @click="deleteReader(reader.DocGiaID)"><i class="fas fa-trash"></i> Xóa</button>
            </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-else>Không có độc giả nào</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      readers: {
        type: Array,
        required: true,
        default: () => []
      }
    },
    methods: {
      async deleteReader(DocGiaID) {
        this.$emit("deleteReader", DocGiaID);
      },
      async updateReader(DocGiaID) {
        this.$emit("updateReader", DocGiaID);
      }
    },
    mounted() {
    console.log("Readers prop:", this.readers);
  },
};
  </script>
  
  <style scoped>
  .table-hover tbody tr:hover {
    background-color: #f8f9fa;
  }
  </style>