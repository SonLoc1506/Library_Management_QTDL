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
              <h5><span><i class="fa-solid fa-user"></i></span> Danh Sách Tác Giả</h5>
              <hr>
            </div>
            <authorList 
            :authors="filteredAuthors"
            @authorDeleted="removeAuthorFromList"
            @updateAuthor="updateAuthor"
            />  
          </div>
          <div class="row mb-3 thanhbutton">
            <button class="btn btn-sm btn-primary col-2 m-3" @click="refreshList">
              <i class="fas fa-redo"></i> Làm mới
            </button>
            <button class="btn btn-sm btn-success col-2 m-3" @click="goToAddAuthor">
              <i class="fas fa-plus"></i> Thêm mới
            </button>
          </div>
        </div>
        <!-- Thêm các phần tử khác như form chỉnh sửa hoặc thêm mới ở đây -->
      </div>
    </main>
    <AppFooterAdmin />
  </div>
</template>

<script>
import AppHeaderAdmin from "@/components/AppHeaderAdmin.vue";
import AppFooterAdmin from "@/components/AppFooterAdmin.vue";
import authorList from "@/components/authorList.vue";
import InputSearchAdmin from "@/components/InputSearchAdmin.vue";
import authorService from "@/services/author.service";

export default {
  components: {
    AppHeaderAdmin,
    AppFooterAdmin,
    InputSearchAdmin,
    authorList
  },
  props: ["session_admin"],
  data() {
    return {
      authors: [], // Dữ liệu tác giả
      searchText: "",
      add: false,
      mode: "create"
    };
  },
  computed: {
    filteredAuthors() {
      if (!this.searchText) return this.authors;
      const searchTextLower = this.searchText.toLowerCase();
      return this.authors.filter(author =>
        author.TenTacGia.toLowerCase().includes(searchTextLower)
      );
    }
  },
  methods: {
    async refreshList() {
      try {
        const response = await authorService.getAll();
        console.log("author data:", response.data);
        this.authors = response.data;
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    },
    goToAddAuthor() {
      this.$router.push('/addauthor');
    },
    async removeAuthorFromList(TacGiaID) {
      if (confirm("Bạn muốn xóa tác giả này?")) {
        try {
          await authorService.delete(TacGiaID);
          this.authors = this.authors.filter(
            (author) => author.TacGiaID !== TacGiaID
          );
        } catch (err) {
          console.log(err);
        }
      }
    },
    async updateAuthor(TacGiaId) {
      if (confirm("Bạn muốn sửa tác giả này?")) {
        this.$router.push(`/edittacgia/${TacGiaId}`);
      }
    },
  },
  mounted() {
    this.refreshList(); // Gọi làm mới danh sách khi trang được tải
  }
};
</script>
