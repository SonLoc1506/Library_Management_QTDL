<template>
  <div>
    <AppHeaderAdmin :session_admin="session_admin" />
    <main>
      <div v-if="accountBreach !== null">
        <div class="container phancach mt-10">
          <div class="pchr">
            <hr style="width: 5rem;flex-grow: 1; height: 3px; margin-right: 1rem;">
          </div>
          <h5 class="mb-2 text-giohang">Chỉnh Sửa Tài Khoản Vi Phạm</h5>
          <div class="pchr">
            <hr style="width: 5rem;flex-grow: 1; height: 3px;margin-left: 1rem;">
          </div>
        </div>

        <div class="container">
          <form @submit.prevent="updateAccountBreach">
            <div class="form-group">
              <label>ID</label>
              <input type="text" class="form-control" v-model="accountBreach.ID" readonly>
            </div>

            <div class="form-group">
              <label>Số Thẻ</label>
              <input type="text" class="form-control" v-model="accountBreach.SoThe" required>
            </div>

            <div class="form-group">
              <label>Ngày Khóa</label>
              <input type="date" class="form-control" v-model="formattedLockDate" required>
            </div>

            <div class="form-group">
              <label>Ngày Mở Khóa</label>
              <input type="date" class="form-control" v-model="formattedUnlockDate" required>
            </div>

            <div class="form-group">
              <label>Lý Do</label>
              <textarea class="form-control" v-model="accountBreach.LyDo" rows="3"></textarea>
            </div>

            <div class="mt-3">
              <button type="submit" class="btn btn-primary me-2">Cập Nhật</button>
              <button type="button" class="btn btn-danger" @click="deleteAccountBreach">Xóa</button>
            </div>
          </form>
        </div>

        <p class="text-success">{{ message }}</p>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
    </main>
    <AppFooterAdmin/>
  </div>
</template>

<script>
import AppHeaderAdmin from "@/components/AppHeaderAdmin.vue";
import AppFooterAdmin from "@/components/AppFooterAdmin.vue";
import accountBreachService from "@/services/AccountBreach.service";

export default {
  components: {
    AppHeaderAdmin,
    AppFooterAdmin
  },
  props: ["session_admin"],
  data() {
    return {
      accountBreach: {
        ID: '',
        NgayKhoa: '',
        NgayMoKhoa: '',
        LyDo: '',
        SoThe: ''
      },
      message: ""
    };
  },
  computed: {
    formattedLockDate: {
      get() {
        if (this.accountBreach.NgayKhoa) {
          const date = new Date(this.accountBreach.NgayKhoa);
          return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
        }
        return '';
      },
      set(value) {
        this.accountBreach.NgayKhoa = value ? new Date(value).toISOString() : null;
      }
    },
    formattedUnlockDate: {
      get() {
        if (this.accountBreach.NgayMoKhoa) {
          const date = new Date(this.accountBreach.NgayMoKhoa);
          return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
        }
        return '';
      },
      set(value) {
        this.accountBreach.NgayMoKhoa = value ? new Date(value).toISOString() : null;
      }
    }
  },
  methods: {
    async getAllAccountBreach() {
      try {
        const id = this.$route.params.id;
        if (!id) {
          throw new Error("Không tìm thấy ID tài khoản vi phạm");
        }

        const response = await accountBreachService.getById(id);
        if (response && response.data) {
          const breachData = response.data;
          if (!breachData.ID) {
            throw new Error("Dữ liệu tài khoản vi phạm không hợp lệ"); 
          }
          this.accountBreach = breachData;
        } else {
          throw new Error("Không tìm thấy thông tin tài khoản vi phạm");
        }
      } catch (error) {
        console.log("Error in getAccountBreach:", error);
        alert(error.message || "Có lỗi xảy ra khi tải thông tin tài khoản vi phạm");
        this.$router.push("/notfound");
      }
    },
    async updateAccountBreach() {
      try {
        const { NgayKhoa, NgayMoKhoa, LyDo, SoThe } = this.accountBreach;

        if (!NgayKhoa || !NgayMoKhoa || !SoThe) {
          throw new Error("Vui lòng điền đầy đủ thông tin bắt buộc");
        }

        const response = await accountBreachService.update(this.accountBreach.ID, {
          NgayKhoa,
          NgayMoKhoa,
          LyDo,
          SoThe
        });

        if (response && response.status === 200) {
          this.message = "Tài khoản vi phạm đã được cập nhật thành công.";
          alert(this.message);
          await this.getAllAccountBreach();
          this.$router.push("/danhsachtaikhoanvipham");
        } else {
          throw new Error(response.message || "Cập nhật thất bại");
        }
      } catch (error) {
        console.log(error);
        alert(error.message || "Có lỗi xảy ra khi cập nhật tài khoản vi phạm");
      }
    },

    async deleteAccountBreach() {
      if (!this.accountBreach || !this.accountBreach.ID) {
        alert("Không tìm thấy thông tin tài khoản vi phạm");
        return;
      }

      if (confirm("Bạn muốn xóa tài khoản vi phạm này?")) {
        try {
          const response = await accountBreachService.delete(this.accountBreach.ID);
          if (response && response.status === 200) {
            alert("Xóa thành công");
            this.$router.push("/danhsachtaikhoanvipham");
          } else {
            throw new Error("Xóa thất bại");
          }
        } catch (error) {
          console.log("Error in deleteAccountBreach:", error);
          alert(error.message || "Có lỗi xảy ra khi xóa tài khoản vi phạm");
        }
      }
    }
  },
  created() {
    this.getAllAccountBreach();
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