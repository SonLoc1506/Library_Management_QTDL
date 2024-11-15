<template>
  <div>
    <AppHeaderAdmin :session_admin="session_admin" />
    <main>
      <div v-if="loanBook !== null">
        <div class="container phancach mt-10">
          <div class="pchr">
            <hr style="width: 5rem;flex-grow: 1; height: 3px; margin-right: 1rem;">
          </div>
          <h5 class="mb-2 text-giohang">Thêm Phiếu Mượn</h5>
          <div class="pchr">
            <hr style="width: 5rem;flex-grow: 1; height: 3px;margin-left: 1rem;">
          </div>
        </div>

        <div class="container">
          <form @submit.prevent="addLoanBook">
            <div class="form-group">
              <label>Mã Nhân Viên</label>
              <input type="text" class="form-control" v-model="loanBook.NhanVienID" required>
            </div>

            <div class="form-group">
              <label>Số Thẻ</label>
              <input type="text" class="form-control" v-model="loanBook.SoThe" required>
            </div>

            <div class="form-group">
              <label>Sách mượn</label>
              <input type="text" class="form-control" v-model="loanBook.ISBN" required>
            </div>

            <div class="form-group">
              <label>Ngày Mượn</label>
              <input type="date" class="form-control" v-model="loanBook.NgayMuon" required>
            </div>

            <div class="mt-3">
              <button type="submit" class="btn btn-primary me-2">Thêm Phiếu Mượn</button>
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
import LoanBookService from "@/services/loanBook.service";

export default {
  components: {
    AppHeaderAdmin,
    AppFooterAdmin
  },
  props: ["session_admin"],
  data() {
    return {
      loanBook: {
        NhanVienID: "",
        SoThe: "",
        NgayMuon: "",
        ISBN: ""
      },
      message: ""
    };
  },
  methods: {
    async addLoanBook() {
      try {
        const res = await LoanBookService.create(this.loanBook);
        console.log(res);
        
        this.message = "Thêm phiếu mượn thành công!";
        this.$router.push("/danhsachphieumuon");
      } catch (error) {
        console.error("Error adding loan book:", error);
        this.message = "Có lỗi xảy ra khi thêm phiếu mượn.";
      }
    }
  }
};
</script>