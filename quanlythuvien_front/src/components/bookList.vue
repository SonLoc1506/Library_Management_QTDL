<template>
  <div class="p-3 rounded bg-body">
    <div v-if="books.length > 0">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">ISBN</th>
            <th scope="col">Tên Sách</th>
            <th scope="col">Số Trang</th>
            <th scope="col">Số Lượng</th>
            <th scope="col">Mô Tả</th>
            <th scope="col">Chủ Đề ID</th>
            <th scope="col">NXB ID</th>
            <th scope="col">Tác Giả ID</th>
            <th scope="col">Năm Xuất Bản</th>
            <th scope="col">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(book, index) in books" :key="book.ISBN">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ book.ISBN }}</td>
            <td>{{ book.TenSach }}</td>
            <td>{{ book.SoTrang }}</td>
            <td>{{ book.Soluong }}</td>
            <td>{{ book.MoTa }}</td>
            <td>{{ book.ChuDeID }}</td>
            <td>{{ book.NXB_ID }}</td>
            <td>{{ book.TacGiaID }}</td>
            <td>{{ formatDate(book.NamXB) }}</td>
            <td>
              <button class="btn btn-warning btn-sm me-2" @click="updateBook(book.ISBN)">Sửa</button>
              <button class="btn btn-danger btn-sm" @click="deleteBook(book.ISBN)"><i class="fas fa-trash"></i> Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-else>Không có sách nào</p>
  </div>
</template>

<script>
export default {
  props: {
    books: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  methods: {
  //   addBook,
  // getBooks,
  // getBookById,
  // updateBook,
  // deleteBook,
    async deleteBook(ISBN) {
      this.$emit("bookDeleted", ISBN);
    },
    async updateBook(ISBN) {
      this.$emit("updateBook", ISBN);
      // this.$router.push(`/addgenres`);
    },
    formatDate(date) {
      const d = new Date(date);
      return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
    }
  },
  mounted() {
    console.log("Books prop:", this.books);
  },
};
</script>

<style scoped>
.table-hover tbody tr:hover {
  background-color: #f8f9fa;
}
</style>
