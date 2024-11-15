<template>
  <div>
    <AppHeaderAdmin :session_admin="session_admin" />
    <main>
      <div v-if="account !== null">
        <div class="container phancach mt-10">
          <div class="pchr">
            <hr style="width: 5rem;flex-grow: 1; height: 3px; margin-right: 1rem;">
          </div>
          <h5 class="mb-2 text-giohang">Chỉnh Sửa Tài Khoản</h5>
          <div class="pchr">
            <hr style="width: 5rem;flex-grow: 1; height: 3px;margin-left: 1rem;">
          </div>
        </div>

        <div class="container" v-if="account">
          <form @submit.prevent="updateUser">
            <div class="form-group">
              <label>ID Tài Khoản</label>
              <input type="text" class="form-control" v-model="account.ID_TaiKhoan" readonly>
            </div>

            <div class="form-group">
              <label>Tên Tài Khoản</label>
              <input type="text" class="form-control" v-model="account.User_Name" required>
            </div>

            <div class="form-group">
              <label>Mật Khẩu</label>
              <input type="password" class="form-control" v-model="account.Pass_wd" required>
            </div>

            <div class="form-group">
              <label>Email</label>
              <input type="email" class="form-control" v-model="account.Email" required>
            </div>

            <div class="form-group">
              <label>Vai Trò</label>
              <input type="text" class="form-control" v-model="account.Role" readonly>
            </div>

            <div class="mt-3">
              <button type="submit" class="btn btn-primary me-2">Cập Nhật</button>
              <button type="button" class="btn btn-danger" @click="deleteUser">Xóa</button>
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
import AuthService from "@/services/auth.service";

export default {
  components: {
    AppHeaderAdmin,
    AppFooterAdmin
  },
  props: ["session_admin"],
  data() {
    return {
      account: null,
      message: ""
    };
  },
  methods: {
    async getAllUser() {
      try {
        const id = this.$route.params.id;
        const response = await AuthService.getById(id);
        console.log(response.data);
        
        if (response && response.data) {
          this.account = response.data[0];
        } else {
          throw new Error("Invalid account data received");
        }
      } catch (error) {
        console.log(error);
        this.$router.push("/notfound");
      }
    },
    async updateUser() {
      try {
        const { User_Name, Pass_wd, Email, Role } = this.account;
        if (!User_Name || !Pass_wd || !Email || !Role) {
          throw new Error("Vui lòng điền đầy đủ thông tin");
        }

        const response = await AuthService.update(this.account.ID_TaiKhoan, {
          User_Name,
          Pass_wd,
          Email,
          Role
        });

        if (response && response.status === 200) {
          this.message = "Tài khoản đã được cập nhật thành công.";
          alert(this.message);
          await this.getAllUser();
          this.$router.push("/danhsachtaikhoan");
        } else {
          throw new Error("Cập nhật thất bại");
        }
      } catch (error) {
        console.log(error);
        alert(error.message || "Có lỗi xảy ra khi cập nhật tài khoản");
      }
    },
    async deleteUser() {
      if (confirm("Bạn muốn xóa tài khoản này?")) {
        try {
          const response = await AuthService.delete(this.account.ID_TaiKhoan);
          if (response && response.status === 200) {
            alert("Xóa thành công");
            this.$router.push("/danhsachtaikhoan");
          } else {
            throw new Error("Xóa thất bại");
          }
        } catch (error) {
          console.log(error);
          alert("Có lỗi xảy ra khi xóa tài khoản");
        }
      }
    },
  },
  created() {
    this.getAllUser();
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