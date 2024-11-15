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
              <!-- <h5>
                <span><i class="fa-solid fa-book"></i></span> Chi tiết phiếu mượn
              </h5> -->
              <hr />
            </div>
            <loanBookDetailList :phieuMuonChiTiets="filteredLoanBookDetails"
              @updateLoanBookDetail="updateLoanBookDetail" />
          </div>
          <div class="row mb-3 thanhbutton">
            <button class="btn btn-sm btn-primary col-2 m-3" @click="refreshList">
              <i class="fas fa-redo"></i> Làm mới
            </button>
            <!-- <button
              class="btn btn-sm btn-success col-2 m-3"
              @click="goToAddBorrowDetail"
            >
              <i class="fas fa-plus"></i> Thêm mới
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
import loanBookDetailList from "@/components/PhieuMuonChiTietList.vue";
import InputSearchAdmin from "@/components/InputSearchAdmin.vue";
import LoanBookDetailService from "@/services/loanBookDetail.service";

export default {
  components: {
    AppHeaderAdmin,
    AppFooterAdmin,
    InputSearchAdmin,
    loanBookDetailList,
  },
  data() {
    return {
      phieuMuonChiTiets: [],
      searchText: "",
      add: false,
      mode: "create",
      session_admin: null
    };
  },
  computed: {
    filteredLoanBookDetails() {
      if (!this.searchText) return this.phieuMuonChiTiets;
      const searchTextLower = this.searchText.toLowerCase();
      return this.phieuMuonChiTiets.filter((detail) =>
        detail.ISBN.toLowerCase().includes(searchTextLower)
      );
    },
  },
  methods: {
    async refreshList() {
      try {
        const response = await LoanBookDetailService.getAll();
        console.log(response);
        this.phieuMuonChiTiets = response.data;
        console.log(this.phieuMuonChiTiets);
      } catch (error) {
        console.error("Error fetching loan book details:", error);
      }
    },
    // goToAddBorrowDetail() {
    //   this.$router.push('/addborrowdetail');
    // },
    // async removeLoanBookDetailFromList(id) {
    //   if (confirm("Bạn muốn xóa chi tiết phiếu mượn này?")) {
    //     try {
    //       await LoanBookDetailService.delete(id);
    //       this.loanBookDetails = this.loanBookDetails.filter((detail) => detail.id !== id);
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   }
    // },
    async updateLoanBookDetail(id, ISBN) {
      if (confirm("Bạn muốn sửa chi tiết phiếu mượn này?")) {
        console.log(id);
        console.log(ISBN);
        this.$router.push(`/editloanbookdetail/${id}&${ISBN}`);

      }
    },
    
  },
  mounted() {
    this.refreshList();
  },
};
</script>
