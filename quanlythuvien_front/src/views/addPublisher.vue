<template>
    <div>
      <AppHeaderAdmin :session_admin="session_admin" />
      <main>
        <div v-if="publisher !== null">
          <div class="container phancach mt-10">
            <div class="pchr">
              <hr style="width: 5rem;flex-grow: 1; height: 3px; margin-right: 1rem;">
            </div>
            <h5 class="mb-2 text-giohang">Thêm Nhà Xuất Bản</h5>
            <div class="pchr">
              <hr style="width: 5rem;flex-grow: 1; height: 3px;margin-left: 1rem;">
            </div>
          </div>
  
          <div class="container">
            <form @submit.prevent="addPublisher">
              <div class="form-group">
                <label>Tên Nhà Xuất Bản</label>
                <input type="text" class="form-control" v-model="publisher.TenNXB" required>
              </div>

              <div class="form-group">
                <label>Địa Chỉ</label>
                <input type="text" class="form-control" v-model="publisher.DiaChi" required>
              </div>

              <div class="form-group">
                <label>Email</label>
                <input type="email" class="form-control" v-model="publisher.Email" required>
              </div>

              <div class="form-group">
                <label>Thông Tin Người Đại Diện</label>
                <input type="text" class="form-control" v-model="publisher.Info_ngDaiDien" required>
              </div>
  
              <div class="mt-3">
                <button type="submit" class="btn btn-primary me-2">Thêm Nhà Xuất Bản</button>
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
import PublisherService from "@/services/publisher.service";

export default {
    components: {
      AppHeaderAdmin,
      AppFooterAdmin
    },
    props: ["session_admin"],
    data() {
      return {
        publisher: {
          TenNXB: '',
          DiaChi: '',
          Email: '',
          Info_ngDaiDien: ''
        },
        message: ""
      };
    },
    methods: {
      async addPublisher() {
        try {
          const { TenNXB, DiaChi, Email, Info_ngDaiDien } = this.publisher;
          if (!TenNXB || !DiaChi || !Email || !Info_ngDaiDien) {
            throw new Error("Vui lòng điền đầy đủ thông tin");
          }

          const response = await PublisherService.create({
            TenNXB,
            DiaChi,
            Email,
            Info_ngDaiDien
          });
          
          if (response && response.status === 200) {
            this.message = "Nhà xuất bản đã được thêm thành công.";
            alert(this.message);
            this.$router.push("/danhsachnxbb");
          } else {
            this.$router.push("/danhsachnxbb");
          }
        } catch (error) {
          console.log(error);
          alert(error.message || "Có lỗi xảy ra khi thêm nhà xuất bản");
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