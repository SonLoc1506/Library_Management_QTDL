<template>
    <div>
      <AppHeaderAdmin :session_admin="session_admin" />
      <main>
        <div v-if="author !== null">
          <div class="container phancach mt-10">
            <div class="pchr">
              <hr style="width: 5rem;flex-grow: 1; height: 3px; margin-right: 1rem;">
            </div>
            <h5 class="mb-2 text-giohang">Thêm Tác Giả</h5>
            <div class="pchr">
              <hr style="width: 5rem;flex-grow: 1; height: 3px;margin-left: 1rem;">
            </div>
          </div>
  
          <div class="container">
            <form @submit.prevent="addAuthor">
              <div class="form-group">
                <label>Tên Tác Giả</label>
                <input type="text" class="form-control" v-model="author.TenTacGia" required>
              </div>
  
              <div class="form-group">
                <label>Website</label>
                <input type="text" class="form-control" v-model="author.Website">
              </div>
  
              <div class="form-group">
                <label>Ghi Chú</label>
                <textarea class="form-control" v-model="author.Note"></textarea>
              </div>
  
              <div class="mt-3">
                <button type="submit" class="btn btn-primary me-2">Thêm Tác Giả</button>
              </div>
            </form>
          </div>
  
          <p class="text-success">{{ message }}</p>
        </div>
        <div v-else>
          <p>Loading...</p>
        </div>
      </main>
      <AppFooterAdmin />
    </div>
  </template>
  
  <script>
  import AppHeaderAdmin from "@/components/AppHeaderAdmin.vue";
  import AppFooterAdmin from "@/components/AppFooterAdmin.vue";
  import AuthorService from "@/services/author.service";
  
  export default {
    components: {
      AppHeaderAdmin,
      AppFooterAdmin
    },
    props: ["session_admin"],
    data() {
      return {
        author: {
          TenTacGia: '',
          Website: '',
          Note: ''
        },
        message: ""
      };
    },
    methods: {
      async addAuthor() {
        try {
          const { TenTacGia, Website, Note } = this.author;
          if (!TenTacGia) {
            throw new Error("Vui lòng nhập tên tác giả");
          }
  
          const response = await AuthorService.create({
            TenTacGia,
            Website,
            Note
          });
          
          if (response && response.status === 200) {
            this.message = "Tác giả đã được thêm thành công.";
            alert(this.message);
            this.$router.push("/danhsachtacgia");
          } else {
            this.$router.push("/danhsachtacgia");
          }
        } catch (error) {
          console.log(error);
          alert(error.message || "Có lỗi xảy ra khi thêm tác giả");
        }
      }
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