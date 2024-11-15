<template>
  <div>
    <AppHeaderAdmin :session_admin="session_admin" />
    <main>
      <div v-if="genre !== null">
        <div class="container phancach mt-10">
          <div class="pchr">
            <hr style="width: 5rem;flex-grow: 1; height: 3px; margin-right: 1rem;">
          </div>
          <h5 class="mb-2 text-giohang">Chỉnh Sửa Chủ Đề</h5>
          <div class="pchr">
            <hr style="width: 5rem;flex-grow: 1; height: 3px;margin-left: 1rem;">
          </div>
        </div>

        <div class="container">
          <form @submit.prevent="updateGenre" v-if="genre">
            <div class="form-group">
              <label>Chủ Đề ID</label>
              <input type="text" class="form-control" v-model="genre.ChuDeID" readonly>
            </div>

            <div class="form-group">
              <label>Tên Chủ Đề</label>
              <input type="text" class="form-control" v-model="genre.TenChuDe" required>
            </div>

            <div class="mt-3">
              <button type="submit" class="btn btn-primary me-2">Cập Nhật</button>
              <button type="button" class="btn btn-danger" @click="deleteGenre">Xóa</button>
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
import GenreService from "@/services/genres.service";

export default {
  components: {
    AppHeaderAdmin,
    AppFooterAdmin
  },
  props: ["session_admin"],
  data() {
    return {
      genre: null,
      message: ""
    };
  },
  methods: {
    async getGenres() {
      try {
        const id = this.$route.params.ChuDeID;
        console.log(id);
        
        const response = await GenreService.getById(id);
        if (response && response.data) {
          this.genre = response.data;
        } else {
          throw new Error("Invalid genre data received");
        }
      } catch (error) {
        console.log(error);
        this.$router.push("/notfound");
      }
    },
    async updateGenre() {
      try {
        const { TenChuDe } = this.genre;
        if (!TenChuDe) {
          throw new Error("Please fill in all required fields");
        }

        const response = await GenreService.update(this.genre.ChuDeID, {
          TenChuDe
        });

        if (response && response.status === 200) {
          this.message = "Chủ đề đã được cập nhật thành công.";
          alert(this.message);
          await this.getGenres();
          this.$router.push("/danhsachchude");
        } else {
          throw new Error("Update failed");
        }
      } catch (error) {
        console.log(error);
        alert(error.message || "Có lỗi xảy ra khi cập nhật chủ đề");
      }
    },
    async deleteGenre() {
      if (confirm("Bạn muốn xóa chủ đề này?")) {
        try {
          const response = await GenreService.delete(this.genre.ChuDeID);
          if (response && response.status === 200) {
            alert("Xóa thành công");
            this.$router.push("/danhsachchude");
          } else {
            throw new Error("Delete failed");
          }
        } catch (error) {
          console.log(error);
          alert("Có lỗi xảy ra khi xóa chủ đề");
        }
      }
    }
  },
  created() {
    this.getGenres();
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