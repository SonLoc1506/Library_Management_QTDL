<template>
    <div>
      <AppHeaderAdmin :session_admin="session_admin" />
      <main>
        <div v-if="reader !== null">
          <div class="container phancach mt-10">
            <div class="pchr">
              <hr style="width: 5rem;flex-grow: 1; height: 3px; margin-right: 1rem;">
            </div>
            <h5 class="mb-2 text-giohang">Thêm Độc Giả</h5>
            <div class="pchr">
              <hr style="width: 5rem;flex-grow: 1; height: 3px;margin-left: 1rem;">
            </div>
          </div>
  
          <div class="container">
            <form @submit.prevent="addReader">
              <div class="form-group">
                <label>Tên Độc Giả</label>
                <input type="text" class="form-control" v-model="reader.TenDocGia" required>
              </div>
  
              <div class="form-group">
                <label>Địa Chỉ</label>
                <input type="text" class="form-control" v-model="reader.DiaChi" required>
              </div>
  
              <div class="form-group">
                <label>Số Điện Thoại</label>
                <input type="text" class="form-control" v-model="reader.SDT" required>
              </div>
  
              <div class="form-group">
                <label>Note</label>
                <input type="text" class="form-control" v-model="reader.Note" required>
              </div>
  
              <div class="mt-3">
                <button type="submit" class="btn btn-primary me-2">Thêm Độc Giả</button>
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
  import ReaderService from "@/services/reader.service";
  
  export default {
    components: {
      AppHeaderAdmin,
      AppFooterAdmin
    },
    props: ["session_admin"],
    data() {
      return {
        reader: {
          TenDocGia: '',
          DiaChi: '',
          SDT: '',
          Note: ''
        },
        message: ""
      };
    },
    methods: {
      async addReader() {
        try {
          const { TenDocGia, DiaChi, SDT, Note } = this.reader;
          if (!TenDocGia || !DiaChi || !SDT || !Note) {
            throw new Error("Vui lòng điền đầy đủ thông tin");
          }
  
          const response = await ReaderService.create({
            TenDocGia,
            DiaChi, 
            SDT,
            Note
          });

          console.log(response);
          
          
          if (response && response.status === 200) {
            this.message = "Độc giả đã được thêm thành công.";
            alert(this.message);
            this.$router.push("/danhsachdocgia");
          } else {
            this.$router.push("/danhsachdocgia");
          }
        } catch (error) {
          console.log(error);
          alert(error.message || "Có lỗi xảy ra khi thêm độc giả");
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