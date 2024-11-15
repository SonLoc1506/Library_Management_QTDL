<template>
  <div>
    <AppHeaderAdmin :session_admin="session_admin" />
    <main>
      <div v-if="loanBook !== null">
        <div class="container phancach mt-10">
          <div class="pchr">
            <hr style="width: 5rem;flex-grow: 1; height: 3px; margin-right: 1rem;">
          </div>
          <h5 class="mb-2 text-giohang">Chỉnh Sửa Phiếu Mượn</h5>
          <div class="pchr">
            <hr style="width: 5rem;flex-grow: 1; height: 3px;margin-left: 1rem;">
          </div>
        </div>

        <div class="container" v-if="loanBook">
          <form @submit.prevent="updateLoanBook">
            <div class="form-group">
              <label>Phiếu Mượn ID</label>
              <input type="text" class="form-control" v-model="loanBook.PhieuMuonID" readonly>
            </div>

            <div class="form-group">
              <label>Nhân Viên ID</label>
              <input type="text" class="form-control" v-model="loanBook.NhanVienID" required>
            </div>

            <div class="form-group">
              <label>Số Thẻ</label>
              <input type="text" class="form-control" v-model="loanBook.SoThe" required>
            </div>

            <div class="form-group">
              <label>Ngày Mượn</label>
              <input type="date" class="form-control" v-model="formatted" required>
            </div>

            <div class="mt-3">
              <button type="submit" class="btn btn-primary me-2">Cập Nhật</button>
              <button type="button" class="btn btn-danger" @click="deleteLoanBook">Xóa</button>
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
      loanBook: null,
      message: ""
    };
  },
  methods: {
    async getLoanBooks() {
      try {
        const id = this.$route.params.PhieuMuonID;


        const response = await LoanBookService.getById(id);
        if (response && response.data) {
          this.loanBook = response.data;
        } else {
          throw new Error("Invalid loan book data received");
        }
      } catch (error) {
        console.log(error);
        this.$router.push("/notfound");
      }
    },
    async updateLoanBook() {
      try {
        const { NhanVienID, SoThe, NgayMuon } = this.loanBook;
        if (!NhanVienID || !SoThe || !NgayMuon) {
          throw new Error("Please fill in all required fields");
        }

        const response = await LoanBookService.update(this.loanBook.PhieuMuonID, {
          NhanVienID,
          SoThe,
          NgayMuon
        });

        console.log(response);
        

        if (response && response.status === 200) {
          this.message = "Phiếu mượn đã được cập nhật thành công.";
          alert(this.message);
          await this.getLoanBooks();
          this.$router.push("/danhsachphieumuon");
        } else {
          throw new Error("Update failed");
        }
      } catch (error) {
        console.log(error);
        alert(error.message || "Có lỗi xảy ra khi cập nhật phiếu mượn");
      }
    },
    async deleteLoanBook() {
      if (confirm("Bạn muốn xóa phiếu mượn này?")) {
        try {
          const response = await LoanBookService.delete(this.loanBook.PhieuMuonID);
          if (response && response.status === 200) {
            alert("Xóa thành công");
            this.$router.push("/danhsachphieumuon");
          } else {
            throw new Error("Delete failed");
          }
        } catch (error) {
          console.log(error);
          alert("Có lỗi xảy ra khi xóa phiếu mượn");
        }
      }
    },
  },
  computed: {
    formatted: {
      get() {
        if (this.loanBook && this.loanBook.NgayMuon) {
          const date = new Date(this.loanBook.NgayMuon);
          return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
        }
        return '';
      },
      set(value) {
        if (this.loanBook) {
          this.loanBook.NgayMuon = value ? new Date(value).toISOString() : null;
        }
      }
    },
  },
  created() {
    this.getLoanBooks();
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