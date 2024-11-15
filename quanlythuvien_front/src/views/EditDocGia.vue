<template>
  <div>
    <AppHeaderAdmin :session_admin="session_admin" />
    <main>
      <div v-if="reader !== null">
        <div class="container phancach mt-10">
          <div class="pchr">
            <hr style="width: 5rem;flex-grow: 1; height: 3px; margin-right: 1rem;">
          </div>
          <h5 class="mb-2 text-giohang">Chỉnh Sửa Độc Giả</h5>
          <div class="pchr">
            <hr style="width: 5rem;flex-grow: 1; height: 3px;margin-left: 1rem;">
          </div>
        </div>

        <div class="container">
          <form @submit.prevent="updateReader">
            <div class="form-group">
              <label>Mã Độc Giả</label>
              <input type="text" class="form-control" v-model="reader.DocGiaID" readonly>
            </div>

            <div class="form-group">
              <label>Tên Độc Giả</label>
              <input type="text" class="form-control" v-model="reader.TenDocGia" required>
            </div>

            <div class="form-group">
              <label>Địa Chỉ</label>
              <input type="text" class="form-control" v-model="reader.DiaChi" required>
            </div>

            <div class="form-group">
              <label>Số Điện Thoại</label>
              <input type="tel" class="form-control" v-model="reader.SDT" required>
            </div>

            <div class="form-group">
              <label>Số Thẻ</label>
              <input type="text" class="form-control" v-model="reader.SoThe" readonly>
            </div>

            <div class="mt-3">
              <button type="submit" class="btn btn-primary me-2">Cập Nhật</button>
              <button type="button" class="btn btn-danger" @click="deleteReader">Xóa</button>
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
import ReaderService from "@/services/reader.service";

export default {
  components: {
    AppHeaderAdmin,
    AppFooterAdmin
  },
  props: ["session_admin"],
  data() {
    return {
      reader: null,
      message: ""
    };
  },
  methods: {
    async getReaders() {
      try {
        const id = this.$route.params.id;
        const response = await ReaderService.getById(id);
        // Add more detailed validation
        if (response && response.data) {
          // Validate required fields exist
          const reader = response.data;
          if (!reader.DocGiaID || !reader.TenDocGia || !reader.DiaChi || !reader.SDT || !reader.SoThe) {
            throw new Error("Missing required reader data fields");
          }
          this.reader = reader;
        } else {
          throw new Error("Invalid reader data received - Expected array with reader object");
        }
      } catch (error) {
        console.log(error);
        this.$router.push("/notfound");
      }
    },
    async updateReader() {
      try {
        const { TenDocGia, DiaChi, SDT } = this.reader;
        if (!TenDocGia || !DiaChi || !SDT) {
          throw new Error("Vui lòng điền đầy đủ thông tin");
        }

        const response = await ReaderService.update(this.reader.DocGiaID, {
          TenDocGia,
          DiaChi,
          SDT
        });

        console.log(response);


        if (response && response.status === 200) {
          // this.message = "Thông tin độc giả đã được cập nhật thành công.";
          this.message = response.message;
          alert(this.message);
          // await this.getReaders();
          this.$router.push("/danhsachdocgia");
        } else {
          throw new Error("Cập nhật thất bại");
        }
      } catch (error) {
        console.log(error);
        alert(error.message || "Có lỗi xảy ra khi cập nhật thông tin độc giả");
      }
    },
    async deleteReader() {
      if (confirm("Bạn muốn xóa độc giả này?")) {
        try {
          const response = await ReaderService.delete(this.reader.DocGiaID);
          if (response && response.status === 200) {
            alert("Xóa thành công");
            this.$router.push("/danhsachdocgia");
          } else {
            throw new Error("Xóa thất bại");
          }
        } catch (error) {
          console.log(error);
          alert("Có lỗi xảy ra khi xóa độc giả");
        }
      }
    }
  },
  created() {
    this.getReaders();
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