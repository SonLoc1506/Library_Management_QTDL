<template>
    <div>
      <AppHeaderAdmin :session_admin="session_admin" />
      <main>
        <div v-if="accountBreach !== null">
          <div class="container phancach mt-10">
            <div class="pchr">
              <hr style="width: 5rem;flex-grow: 1; height: 3px; margin-right: 1rem;">
            </div>
            <h5 class="mb-2 text-giohang">Thêm Vi Phạm</h5>
            <div class="pchr">
              <hr style="width: 5rem;flex-grow: 1; height: 3px;margin-left: 1rem;">
            </div>
          </div>
  
          <div class="container">
            <form @submit.prevent="addAccountBreach">
              <div class="form-group">
                <label>Số Thẻ</label>
                <input type="text" class="form-control" v-model="accountBreach.SoThe" required>
              </div>

              <div class="form-group">
                <label>Ngày Khóa</label>
                <input type="date" class="form-control" v-model="accountBreach.NgayKhoa" required>
              </div>

              <div class="form-group">
                <label>Ngày Mở Khóa</label>
                <input type="date" class="form-control" v-model="accountBreach.NgayMoKhoa" required>
              </div>

              <div class="form-group">
                <label>Lý Do</label>
                <textarea class="form-control" v-model="accountBreach.LyDo" required></textarea>
              </div>
  
              <div class="mt-3">
                <button type="submit" class="btn btn-primary me-2">Thêm Vi Phạm</button>
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
import AccountBreachService from "@/services/AccountBreach.service";

export default {
    components: {
      AppHeaderAdmin,
      AppFooterAdmin
    },
    props: ["session_admin"],
    data() {
      return {
        accountBreach: {
          SoThe: '',
          NgayKhoa: '',
          NgayMoKhoa: '',
          LyDo: ''
        },
        message: ""
      };
    },
    methods: {
      async addAccountBreach() {
        try {
          const { SoThe, NgayKhoa, NgayMoKhoa, LyDo } = this.accountBreach;
          if (!SoThe || !NgayKhoa || !NgayMoKhoa || !LyDo) {
            throw new Error("Vui lòng điền đầy đủ thông tin");
          }

          const response = await AccountBreachService.create({
            SoThe,
            NgayKhoa,
            NgayMoKhoa,
            LyDo
          });
          
          if (response && response.status === 200) {
            this.message = "Vi phạm đã được thêm thành công.";
            alert(this.message);
            this.$router.push("/danhsachdocgiavipham");
          } else {
            this.$router.push("/danhsachdocgiavipham");
          }
        } catch (error) {
          console.log(error);
          alert(error.message || "Có lỗi xảy ra khi thêm vi phạm");
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