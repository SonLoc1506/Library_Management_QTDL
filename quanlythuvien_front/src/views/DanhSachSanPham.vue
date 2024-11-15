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
                <span><i class="fa-solid fa-book"></i></span> Danh mục Sách
              </h5>
              <hr />
            </div>
            <bookList
              :books="filteredBooks"
              @bookDeleted="removeBookFromList"
              @updateBook="updateBook"
            />
          </div>
          <div class="row mb-3 thanhbutton">
            <button
              class="btn btn-sm btn-primary col-2 m-3"
              @click="refreshList"
            >
              <i class="fas fa-redo"></i> Làm mới
            </button>
            <button
              class="btn btn-sm btn-success col-2 m-3"
              @click="goToAddBook"
            >
              <i class="fas fa-plus"></i> Thêm mới
            </button>
            <!-- <button
              class="btn btn-sm btn-danger col-2 m-3"
              @click="removeAllBooks"
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
import bookList from "@/components/bookList.vue";
import InputSearchAdmin from "@/components/InputSearchAdmin.vue";
// import axios from "axios";
import BookService from "@/services/book.service";

export default {
  components: {
    AppHeaderAdmin,
    AppFooterAdmin,
    InputSearchAdmin,
    bookList,
  },
  data() {
    return {
      books: [],
      searchText: "",
      add: false,
      mode: "create",
      session_admin: null
    };
  },
  computed: {
    filteredBooks() {
      if (!this.searchText) return this.books;
      const searchTextLower = this.searchText.toLowerCase();
      return this.books.filter((book) =>
        book.TenSach.toLowerCase().includes(searchTextLower)
      );
    },
  },
  methods: {
    async refreshList() {
      try {
        const response = await BookService.getAll();
        console.log(response);
        this.books = response.data;
        console.log(this.books);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    },
    goToAddBook() {
      this.$router.push('/addbook');
    },
    async removeBookFromList(ISBN) {
      if (confirm("Bạn muốn xóa sách này?")) {
        try {
          await BookService.delete(ISBN);
          this.books = this.books.filter((book) => book.ISBN !== ISBN);
        } catch (err) {
          console.log(err);
        }
      }
    },
    async updateBook(ISBN) {
      if (confirm("Bạn muốn sửa sách này?")) {
        this.$router.push(`/editsanpham/${ISBN}`);  
      }
    },
  },
  mounted() {
    this.refreshList(); // Gọi khi trang được tải
  },
};
</script>
