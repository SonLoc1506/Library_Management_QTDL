<template>
    <div>
      <AppHeaderAdmin :session_admin="session_admin" />
      <main>
        <div v-if="book !== null">
          <div class="container phancach mt-10">
            <div class="pchr">
              <hr style="width: 5rem;flex-grow: 1; height: 3px; margin-right: 1rem;">
            </div>
            <h5 class="mb-2 text-giohang">Thêm Sách</h5>
            <div class="pchr">
              <hr style="width: 5rem;flex-grow: 1; height: 3px;margin-left: 1rem;">
            </div>
          </div>
  
          <div class="container">
            <form @submit.prevent="addBook">
              <!-- <div class="form-group">
                <label>ISBN</label>
                <input type="text" class="form-control" v-model="book.ISBN" required>
              </div> -->
  
              <div class="form-group">
                <label>Tên Sách</label>
                <input type="text" class="form-control" v-model="book.TenSach" required>
              </div>
  
              <div class="form-group">
                <label>Số Trang</label>
                <input type="number" class="form-control" v-model="book.SoTrang" required>
              </div>
  
              <div class="form-group">
                <label>Số Lượng</label>
                <input type="number" class="form-control" v-model="book.Soluong" required>
              </div>
  
              <div class="form-group">
                <label>Mô Tả</label>
                <textarea class="form-control" v-model="book.MoTa"></textarea>
              </div>
  
              <div class="form-group">
                <label>Chủ Đề ID</label>
                <input type="text" class="form-control" v-model="book.ChuDeID" required>
              </div>
  
              <div class="form-group">
                <label>NXB ID</label>
                <input type="text" class="form-control" v-model="book.NXB_ID" required>
              </div>
  
              <div class="form-group">
                <label>Tác Giả ID</label>
                <input type="text" class="form-control" v-model="book.TacGiaID" required>
              </div>
  
              <div class="form-group">
                <label>Năm Xuất Bản</label>
                <input type="date" class="form-control" v-model="formatted" required>
              </div>
  
              <div class="mt-3">
                <button type="submit" class="btn btn-primary me-2">Thêm Sách</button>
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
  import BookService from "@/services/book.service";
  
  export default {
    components: {
      AppHeaderAdmin,
      AppFooterAdmin
    },
    props: ["session_admin"],
    data() {
      return {
        book: {
          TenSach: '',
          SoTrang: '',
          Soluong: '',
          MoTa: '',
          ChuDeID: '',
          NXB_ID: '',
          TacGiaID: '',
          NamXB: null
        },
        message: ""
      };
    },
    methods: {
      async addBook() {
        try {
          const { TenSach, SoTrang, Soluong, MoTa, ChuDeID, NXB_ID, TacGiaID, NamXB } = this.book;
          // Ensure all required fields are present
          if (!TenSach || !SoTrang || !Soluong || !ChuDeID || !NXB_ID || !TacGiaID || !NamXB) {
            throw new Error("Please fill in all required fields");
          }
  
          const response = await BookService.create({
            TenSach,
            SoTrang,
            Soluong,
            MoTa,
            ChuDeID,
            NXB_ID,
            TacGiaID,
            NamXB
          });
          console.log(response);
          
          if (response && response.status === 200) {
            this.message = "Sách đã được thêm thành công.";
            alert(this.message);
            this.$router.push("/danhsachsanpham");
          } else {
            this.$router.push("/danhsachsanpham");
          }
        } catch (error) {
          console.log(error);
          alert(error.message || "Có lỗi xảy ra khi thêm sách");
        }
      }
    },
    computed: {
      formatted: {
        get() {
          if (this.book.NamXB) {
            const date = new Date(this.book.NamXB);
            return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
          }
          return '';
        },
        set(value) {
          this.book.NamXB = value ? new Date(value).toISOString() : null;
        }
      },
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