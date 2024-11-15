<template>
    <div>
        <AppHeaderAdmin :session_admin="session_admin" />
        <main>
            <div v-if="account !== null">
                <div class="container phancach mt-10">
                    <div class="pchr">
                        <hr style="width: 5rem;flex-grow: 1; height: 3px; margin-right: 1rem;">
                    </div>
                    <h5 class="mb-2 text-giohang">Thêm Tài Khoản</h5>
                    <div class="pchr">
                        <hr style="width: 5rem;flex-grow: 1; height: 3px;margin-left: 1rem;">
                    </div>
                </div>

                <div class="container">
                    <form @submit.prevent="addAccount">
                        <!-- <div class="form-group">
              <label>ID Tài Khoản</label>
              <input type="text" class="form-control" v-model="account.ID_TaiKhoan" required>
            </div> -->

                        <div class="form-group">
                            <label>Tên người dùng</label>
                            <input type="text" class="form-control" v-model="account.User_Name" required>
                        </div>

                        <div class="form-group">
                            <label>Mật khẩu</label>
                            <input type="password" class="form-control" v-model="account.Pass_wd" required>
                        </div>

                        <div class="form-group">
                            <label>Email</label>
                            <input type="email" class="form-control" v-model="account.Email" required>
                        </div>

                        <div class="form-group">
                            <label>Số điện thoại</label>
                            <input type="tel" class="form-control" v-model="account.SDT" required>
                        </div>

                        <div class="form-group">
                            <label>Vai trò</label>
                            <!-- <select class="form-control" v-model="account.Role" required>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select> -->
                            <input type="text" class="form-control" v-model="account.Role" readonly>
                        </div>

                        <div class="mt-3">
                            <button type="submit" class="btn btn-primary me-2">Thêm Tài Khoản</button>
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
            account: {
                ID_TaiKhoan: '',
                User_Name: '',
                Pass_wd: '',
                Email: '',
                Role: 'NhanVien',
                SDT: ''
            },
            message: ""
        };
    },
    methods: {
        async addAccount() {
            try {
                const { User_Name, Email, Pass_wd, Role, SDT } = this.account;
                if (!User_Name || !Pass_wd || !Email || !SDT) {
                    throw new Error("Vui lòng nhập đầy đủ thông tin");
                }

                const response = await AuthService.register({
                    User_Name,
                    Email,
                    Pass_wd,
                    Role,
                    SDT
                });

                console.log(response);
                

                if (response && response.status === 200) {
                    this.message = "Tài khoản đã được thêm thành công.";
                    alert(this.message);
                    this.$router.push("/danhsachtaikhoan");
                } else {
                    alert(response.message);
                }
            } catch (error) {
                console.log(error);
                alert(error.message || "Có lỗi xảy ra khi thêm tài khoản");
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