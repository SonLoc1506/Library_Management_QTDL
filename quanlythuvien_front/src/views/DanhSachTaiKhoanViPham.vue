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
                <span><i class="fa-solid fa-user-lock"></i></span> Danh sách Tài khoản vi phạm
              </h5>
              <hr />
            </div>
            <accountBreachList
              :accountBreaches="filteredAccountBreaches"
              @accountBreachDeleted="removeAccountBreachFromList"
              @updateAccountBreach="updateAccountBreach"
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
              @click="goToAddAccountBreach"
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
import accountBreachList from "@/components/accountBreachList.vue";
import InputSearchAdmin from "@/components/InputSearchAdmin.vue";
import AccountBreachService from "@/services/AccountBreach.service";

export default {
  components: {
    AppHeaderAdmin,
    AppFooterAdmin,
    InputSearchAdmin,
    accountBreachList,
  },
  data() {
    return {
      accountBreaches: [],
      searchText: "",
      add: false,
      mode: "create",
      session_admin: null
    };
  },
  computed: {
    filteredAccountBreaches() {
      if (!this.searchText) return this.accountBreaches;
      const searchTextLower = this.searchText.toLowerCase();
      return this.accountBreaches.filter((breach) =>
        breach.SoThe.toLowerCase().includes(searchTextLower)
      );
    },
  },
  methods: {
    async refreshList() {
      try {
        const response = await AccountBreachService.getAll();
        console.log(response);
        this.accountBreaches = response.data;
        console.log(this.accountBreaches);
      } catch (error) {
        console.error("Error fetching account breaches:", error);
      }
    },
    goToAddAccountBreach() {
      this.$router.push('/addaccountbreach');
    },
    async removeAccountBreachFromList(id) {
      if (confirm("Bạn muốn xóa vi phạm này?")) {
        try {
          await AccountBreachService.delete(id);
          this.accountBreaches = this.accountBreaches.filter((breach) => breach.ID !== id);
        } catch (err) {
          console.log(err);
        }
      }
    },
    async updateAccountBreach(id) {
      if (confirm("Bạn muốn sửa thông tin vi phạm này?")) {
        this.$router.push(`/editaccountbreach/${id}`);  
      }
    },
  },
  mounted() {
    this.refreshList();
  },
};
</script>
