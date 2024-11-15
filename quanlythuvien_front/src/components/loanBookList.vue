<template>
  <div class="p-3 rounded bg-body">
    <div v-if="loanBooks.length > 0">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Mã Phiếu Mượn</th>
            <th scope="col">Mã Nhân Viên</th>
            <th scope="col">Số Thẻ</th>
            <th scope="col">Ngày Mượn</th>
            <th scope="col">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(loanBook, index) in loanBooks" :key="loanBook.PhieuMuonID">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ loanBook.PhieuMuonID }}</td>
            <td>{{ loanBook.NhanVienID }}</td>
            <td>{{ loanBook.SoThe }}</td>
            <td>{{ formatDate(loanBook.NgayMuon) }}</td>
            <td>
              <button class="btn btn-warning btn-sm me-2" @click="updateLoanBook(loanBook.PhieuMuonID)">Sửa</button>
              <button class="btn btn-danger btn-sm" @click="deleteLoanBook(loanBook.PhieuMuonID)"><i class="fas fa-trash"></i> Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-else>Không có phiếu mượn nào</p>
  </div>
</template>

<script>
export default {
  props: {
    loanBooks: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  methods: {
    async deleteLoanBook(PhieuMuonID) {
      this.$emit("loanBookDeleted", PhieuMuonID);
    },
    async updateLoanBook(PhieuMuonID) {
      this.$emit("updateLoanBook", PhieuMuonID);
    },
    formatDate(date) {
      const d = new Date(date);
      return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
    }
  },
  mounted() {
    console.log("LoanBooks prop:", this.loanBooks);
  },
};
</script>

<style scoped>
.table-hover tbody tr:hover {
  background-color: #f8f9fa;
}
</style>