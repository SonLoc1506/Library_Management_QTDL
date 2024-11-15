<template>
    <div class="shadow p-3 rounded bg-body">
      <div v-if="authors.length > 0">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">ID Tác Giả</th>
              <th scope="col">Tên Tác Giả</th>
              <th scope="col">Website</th>
              <th scope="col">Ghi Chú</th>
              <th scope="col">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(author, index) in authors" :key="author.TacGiaID">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ author.TacGiaID }}</td>
              <td>{{ author.TenTacGia }}</td>
              <td>
                <a v-if="author.Website" :href="author.Website" target="_blank">{{ author.Website }}</a>
                <span v-else>Không có website</span>
              </td>
              <td>{{ author.Note || 'Không có ghi chú' }}</td>
              <td>
                <button class="btn btn-warning btn-sm me-2" @click="updateAuthor(author.TacGiaID)">Sửa</button>
                <button class="btn btn-danger btn-sm" @click="deleteAuthor(author.TacGiaID)">Xóa</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-else>Không có tác giả nào.</p>
    </div>
  </template>
  
  <script>

  export default {
    props: {
      authors: {
        type: Array,
        required: true,
        default: () => []
      }
    },
    methods: {
      async deleteAuthor(TacGiaId) {
        this.$emit("authorDeleted", TacGiaId);
      },
      async updateAuthor(TacGiaId) {
        this.$emit("updateAuthor", TacGiaId);
      }
    },
    mounted() {
      // Log the authors data to check its structure
      console.log('Authors data:', this.authors);
    }
  };
  </script>
  
  <style scoped>
  .table-hover tbody tr:hover {
    background-color: #f8f9fa;
  }
  </style>