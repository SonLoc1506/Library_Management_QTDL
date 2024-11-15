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
                <span><i class="fa-solid fa-book"></i></span> Danh sách Phiếu Mượn
              </h5>
              <hr />
            </div>
            <loanBookList
              :loanBooks="filteredLoanBooks"
              @loanBookDeleted="removeLoanBookFromList"
              @updateLoanBook="updateLoanBook"
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
              @click="goToAddLoanBook"
            >
              <i class="fas fa-plus"></i> Thêm mới
            </button>
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
import loanBookList from "@/components/loanBookList.vue";
import InputSearchAdmin from "@/components/InputSearchAdmin.vue";
import LoanBookService from "@/services/loanBook.service";

export default {
  components: {
    AppHeaderAdmin,
    AppFooterAdmin,
    InputSearchAdmin,
    loanBookList,
  },
  data() {
    return {
      loanBooks: [],
      searchText: "",
      add: false,
      mode: "create",
      session_admin: null
    };
  },
  computed: {
    filteredLoanBooks() {
        if (!this.searchText) return this.loanBooks;
      const searchTextLower = this.searchText.toLowerCase();
      return this.loanBooks.filter((loanBook) =>
        loanBook.PhieuMuonID.toLowerCase().includes(searchTextLower)
      );
    },
  },
  methods: {
    async refreshList() {
      try {
        const response = await LoanBookService.getAll();
        console.log(response);
        this.loanBooks = response.data;
        console.log(this.loanBooks);
      } catch (error) {
        console.error("Error fetching loanBooks:", error);
      }
    },
    goToAddLoanBook() {
      this.$router.push('/addloanbook');
    },
    async removeLoanBookFromList(PhieuMuonID) {
      if (confirm("Bạn muốn xóa phiếu mượn này?")) {
        try {
          await LoanBookService.delete(PhieuMuonID);
          this.loanBooks = this.loanBooks.filter((loanBook) => loanBook.PhieuMuonID !== PhieuMuonID);
        } catch (err) {
          console.log(err);
        }
    }
    },
    async updateLoanBook(PhieuMuonID) {
      if (confirm("Bạn muốn sửa phiếu mượn này?")) {
        this.$router.push(`/editphieumuon/${PhieuMuonID}`);  
      }
    },
  },
  mounted() {
    this.refreshList();
  },
};
</script>
