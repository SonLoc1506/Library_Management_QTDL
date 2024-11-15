<template>
  <div>
    <AppHeaderAdmin :session_admin="session_admin" />
    <main>
      <div v-if="loanBookDetail !== null">
        <div class="container phancach mt-10">
          <div class="pchr">
            <hr style="width: 5rem;flex-grow: 1; height: 3px; margin-right: 1rem;">
          </div>
          <h5 class="mb-2 text-giohang">Chỉnh Sửa Chi Tiết Phiếu Mượn</h5>
          <div class="pchr">
            <hr style="width: 5rem;flex-grow: 1; height: 3px;margin-left: 1rem;">
          </div>
        </div>

        <div class="container">
          <form @submit.prevent="updateLoanBookDetail">
            <div class="form-group">
              <label>Mã Phiếu Mượn</label>
              <input type="text" class="form-control" v-model="loanBookDetail.PhieuMuonID" readonly>
            </div>

            <div class="form-group">
              <label>ISBN</label>
              <input type="text" class="form-control" v-model="loanBookDetail.ISBN" readonly>
            </div>

            <div class="form-group">
              <label>Ngày Trả</label>
              <input type="date" class="form-control" v-model="loanBookDetail.NgayTra" required>
            </div>

            <div class="form-group">
              <label>Đã Trả</label>
              <select class="form-control" v-model="loanBookDetail.DaTra">
                <option :value="true">Đã trả</option>
                <option :value="false">Chưa trả</option>
              </select>
            </div>

            <div class="form-group">
              <label>Ghi Chú</label>
              <textarea class="form-control" v-model="loanBookDetail.Note"></textarea>
            </div>

            <div class="mt-3">
              <button type="submit" class="btn btn-primary me-2">Cập Nhật</button>
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
import LoanBookDetailService from "@/services/loanBookDetail.service";

export default {
  components: {
    AppHeaderAdmin,
    AppFooterAdmin
  },
  props: ["session_admin"],
  data() {
    return {
      loanBookDetail: null,
      message: ""
    };
  },
  methods: {
    async getLoanBookDetails() {
      try {
        const id = this.$route.params.id;
        const ISBN = this.$route.params.ISBN;
        const response = await LoanBookDetailService.getById(id, ISBN);
        console.log(response);
        
        if (response && response.data) {
          this.loanBookDetail = response.data[0];
        } else {
          throw new Error("Invalid loan book detail data received");
        }
      } catch (error) {
        console.log(error);
        this.$router.push("/notfound");
      }
    },
    async updateLoanBookDetail() {
      try {
        const { PhieuMuonID, ISBN, NgayTra, DaTra, Note } = this.loanBookDetail;
        if (!PhieuMuonID || !ISBN || !NgayTra) {
          throw new Error("Vui lòng điền đầy đủ thông tin");
        }

        const response = await LoanBookDetailService.update(this.loanBookDetail.PhieuMuonID, this.$route.params.ISBN, {
          PhieuMuonID,
          ISBN, 
          NgayTra,
          DaTra,
          Note
        });

        if (response && response.status === 200) {
          this.message = "Chi tiết phiếu mượn đã được cập nhật thành công.";
          alert(this.message);
          this.$router.push("/danhsachphieumuonchitiet");
        } else {
          throw new Error("Cập nhật thất bại");
        }
      } catch (error) {
        console.log(error);
        alert(error.message || "Có lỗi xảy ra khi cập nhật chi tiết phiếu mượn");
      }
    },
    
  },
  created() {
    this.getLoanBookDetails();
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