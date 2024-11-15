<template>
  <div>
    <AppHeaderAdmin :session_admin="session_admin" />
    <main>
      <div v-if="author !== null">
        <div class="container phancach mt-10">
          <div class="pchr">
            <hr style="width: 5rem;flex-grow: 1; height: 3px; margin-right: 1rem;">
          </div>
          <h5 class="mb-2 text-giohang">Chỉnh Sửa Tác Giả</h5>
          <div class="pchr">
            <hr style="width: 5rem;flex-grow: 1; height: 3px;margin-left: 1rem;">
          </div>
        </div>

        <div class="container">
          <form @submit.prevent="updateAuthor">
            <div class="form-group">
              <label>ID Tác Giả</label>
              <input type="text" class="form-control" v-model="author.TacGiaID" readonly>
            </div>

            <div class="form-group">
              <label>Tên Tác Giả</label>
              <input type="text" class="form-control" v-model="author.TenTacGia" required>
            </div>

            <div class="form-group">
              <label>Website</label>
              <input type="url" class="form-control" v-model="author.Website">
            </div>

            <div class="form-group">
              <label>Ghi chú</label>
              <textarea class="form-control" v-model="author.Note" rows="3"></textarea>
            </div>

            <div class="mt-3">
              <button type="submit" class="btn btn-primary me-2">Cập Nhật</button>
              <button type="button" class="btn btn-danger" @click="deleteAuthor">Xóa</button>
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
import authorService from "@/services/author.service";

export default {
  components: {
    AppHeaderAdmin,
    AppFooterAdmin
  },
  props: ["session_admin"],
  data() {
    return {
      author: {
        TacGiaID: '',
        TenTacGia: '',
        Website: '',
        Note: ''
      },
      message: ""
    };
  },
  methods: {
    async getAuthor() {
      try {
        const id = this.$route.params.TacGiaId;
        if (!id) {
          throw new Error("Không tìm thấy ID tác giả");
        }

        const response = await authorService.getById(id);
        if (response && response.data) {
          const authorData = response.data;
          if (!authorData.TacGiaID) {
            throw new Error("Dữ liệu tác giả không hợp lệ"); 
          }
          this.author = authorData;
        } else {
          throw new Error("Không tìm thấy thông tin tác giả");
        }
      } catch (error) {
        console.log("Error in getAuthor:", error);
        alert(error.message || "Có lỗi xảy ra khi tải thông tin tác giả");
        this.$router.push("/notfound");
      }
    },
    async updateAuthor() {
  try {
    const { TenTacGia, Website, Note } = this.author;

    // Ensure required fields are present
    if (!TenTacGia) {
      throw new Error("Vui lòng điền tên tác giả");
    }

    const response = await authorService.update(this.author.TacGiaID, {
      TenTacGia,
      Website,
      Note
    });

    if (response && response.status === 200) {
      this.message = "Tác giả đã được cập nhật thành công.";
      alert(this.message);
      await this.getAuthor(); // Refresh author data after update
      this.$router.push("/danhsachtacgia");
    } else {
      throw new Error(response.message || "Cập nhật thất bại");
    }
  } catch (error) {
    console.log(error);
    alert(error.message || "Có lỗi xảy ra khi cập nhật tác giả");
      }
    },

    async deleteAuthor() {
      if (!this.author || !this.author.TacGiaID) {
        alert("Không tìm thấy thông tin tác giả");
        return;
      }

      if (confirm("Bạn muốn xóa tác giả này?")) {
        try {
          const response = await authorService.delete(this.author.TacGiaID);
          if (response && response.status === 200) {
            alert("Xóa thành công");
            this.$router.push("/danhsachtacgia");
          } else {
            throw new Error("Xóa thất bại");
          }
        } catch (error) {
          console.log("Error in deleteAuthor:", error);
          alert(error.message || "Có lỗi xảy ra khi xóa tác giả");
        }
      }
    }
  },
  created() {
    this.getAuthor();
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