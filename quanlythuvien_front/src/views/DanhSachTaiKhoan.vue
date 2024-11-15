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
                <span><i class="fa-solid fa-users"></i></span> Danh sách tài khoản
              </h5>
              <hr />
            </div>
            <table class="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tên người dùng</th>
                  <th>Mật khẩu</th>
                  <th>Email</th>
                  <th>Vai trò</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="account in filteredAccounts" :key="account.ID_TaiKhoan">
                  <td>{{ account.ID_TaiKhoan }}</td>
                  <td>{{ account.User_Name }}</td>
                  <td>{{ account.Pass_wd }}</td>
                  <td>{{ account.Email }}</td>
                  <td>{{ account.Role }}</td>
                  <td>
                    <button class="btn btn-primary btn-sm me-2" @click="updateUser(account.ID_TaiKhoan)">
                      <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger btn-sm" @click="removeAccount(account.ID_TaiKhoan)">
                      <i class="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="row mb-3 thanhbutton">
            <button class="btn btn-sm btn-primary col-2 m-3" @click="refreshList">
              <i class="fas fa-redo"></i> Làm mới
            </button>
            <button class="btn btn-sm btn-success col-2 m-3" @click="goToAddAccount">
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
import InputSearchAdmin from "@/components/InputSearchAdmin.vue";
import AuthService from "@/services/auth.service";

export default {
  components: {
    AppHeaderAdmin,
    AppFooterAdmin,
    InputSearchAdmin,
  },
  data() {
    return {
      accounts: [],
      searchText: "",
      session_admin: null
    };
  },
  computed: {
    filteredAccounts() {
      if (!this.searchText) return this.accounts;
      const searchTextLower = this.searchText.toLowerCase();
      return this.accounts.filter((account) =>
        account.User_Name.toLowerCase().includes(searchTextLower)
      );
    },
  },
  methods: {
    async refreshList() {
      try {
        const response = await AuthService.getAll();
        this.accounts = response.data;
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    },
    goToAddAccount() {
      this.$router.push('/addaccount');
    },
    async removeAccount(id) {
      if (confirm("Bạn muốn xóa tài khoản này?")) {
        try {
          await AuthService.delete(id);
          this.accounts = this.accounts.filter((account) => account.ID_TaiKhoan !== id);
        } catch (err) {
          console.log(err);
        }
      }
    },
    async updateUser(id) {
      if (confirm("Bạn muốn sửa tài khoản này?")) {
        this.$router.push(`/edittaikhoan/${id}`);  
      }
    },
  },
  mounted() {
    this.refreshList();
  },
};
</script>
