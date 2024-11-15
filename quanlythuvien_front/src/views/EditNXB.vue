<template>
  <div>
    <AppHeaderAdmin :session_admin="session_admin" />
    <main>
      <div v-if="nxb !== null">
        <div class="container phancach mt-10">
          <div class="pchr">
            <hr style="width: 5rem;flex-grow: 1; height: 3px; margin-right: 1rem;">
          </div>
          <h5 class="mb-2 text-giohang">Chỉnh Sửa Nhà Xuất Bản</h5>
          <div class="pchr">
            <hr style="width: 5rem;flex-grow: 1; height: 3px;margin-left: 1rem;">
          </div>
        </div>

        <div class="container">
          <form @submit.prevent="updateNXB">
            <div class="form-group">
              <label>Mã NXB</label>
              <input type="text" class="form-control" v-model="nxb.NXB_ID" readonly>
            </div>

            <div class="form-group">
              <label>Tên Nhà Xuất Bản</label>
              <input type="text" class="form-control" v-model="nxb.TenNXB" required>
            </div>

            <div class="form-group">
              <label>Địa Chỉ</label>
              <input type="text" class="form-control" v-model="nxb.DiaChi" required>
            </div>

            <div class="form-group">
              <label>Email</label>
              <input type="email" class="form-control" v-model="nxb.Email" required>
            </div>

            <div class="form-group">
              <label>Thông Tin Người Đại Diện</label>
              <input type="text" class="form-control" v-model="nxb.Info_ngDaiDien" required>
            </div>

            <div class="mt-3">
              <button type="submit" class="btn btn-primary me-2">Cập Nhật</button>
              <button type="button" class="btn btn-danger" @click="deleteNXB">Xóa</button>
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
import NXBService from "@/services/publisher.service";

export default {
  components: {
    AppHeaderAdmin,
    AppFooterAdmin
  },
  props: ["session_admin"],
  data() {
    return {
      nxb: null,
      message: ""
    };
  },
  methods: {
    async getPublishers() {
      try {
        const id = this.$route.params.NXB_ID;
        const response = await NXBService.getById(id);
        if (response && response.data) {
          this.nxb = response.data[0];
        } else {
          throw new Error("Invalid publisher data received");
        }
      } catch (error) {
        console.log(error);
        this.$router.push("/notfound");
      }
    },
    async updateNXB() {
      try {
        const { TenNXB, DiaChi, Email, Info_ngDaiDien } = this.nxb;
        if (!TenNXB || !DiaChi || !Email || !Info_ngDaiDien) {
          throw new Error("Vui lòng điền đầy đủ thông tin");
        }

        const response = await NXBService.update(this.nxb.NXB_ID, {
          TenNXB,
          DiaChi,
          Email,
          Info_ngDaiDien
        });

        if (response && response.status === 200) {
          this.message = "Nhà xuất bản đã được cập nhật thành công.";
          alert(this.message);
          await this.getPublishers();
          this.$router.push("/danhsachnxbb");
        } else {
          throw new Error("Cập nhật thất bại");
        }
      } catch (error) {
        console.log(error);
        alert(error.message || "Có lỗi xảy ra khi cập nhật nhà xuất bản");
      }
    },
    async deleteNXB() {
      if (confirm("Bạn muốn xóa nhà xuất bản này?")) {
        try {
          const response = await NXBService.delete(this.nxb.NXB_ID);
          if (response && response.status === 200) {
            alert("Xóa thành công");
            this.$router.push("/danhsachnxbb");
          } else {
            throw new Error("Xóa thất bại");
          }
        } catch (error) {
          console.log(error);
          alert("Có lỗi xảy ra khi xóa nhà xuất bản");
        }
      }
    }
  },
  created() {
    this.getPublishers();
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