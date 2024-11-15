<template>
    <div>
      <AppHeaderAdmin :session_admin="session_admin" />
      <main>
        <div v-if="genre !== null">
          <div class="container phancach mt-10">
            <div class="pchr">
              <hr style="width: 5rem;flex-grow: 1; height: 3px; margin-right: 1rem;">
            </div>
            <h5 class="mb-2 text-giohang">Thêm Chủ Đề</h5>
            <div class="pchr">
              <hr style="width: 5rem;flex-grow: 1; height: 3px;margin-left: 1rem;">
            </div>
          </div>
  
          <div class="container">
            <form @submit.prevent="addGenre">
              <div class="form-group">
                <label>Tên Chủ Đề</label>
                <input type="text" class="form-control" v-model="genre.TenChuDe" required>
              </div>
  
              <div class="mt-3">
                <button type="submit" class="btn btn-primary me-2">Thêm Chủ Đề</button>
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
import GenreService from "@/services/genres.service";

export default {
    components: {
      AppHeaderAdmin,
      AppFooterAdmin
    },
    props: ["session_admin"],
    data() {
      return {
        genre: {
          TenChuDe: ''
        },
        message: ""
      };
    },
    methods: {
      async addGenre() {
        try {
          const { TenChuDe } = this.genre;
          if (!TenChuDe) {
            throw new Error("Vui lòng nhập tên chủ đề");
          }

          const response = await GenreService.create({
            TenChuDe
          });
          
          if (response && response.status === 200) {
            this.message = "Chủ đề đã được thêm thành công.";
            alert(this.message);
            this.$router.push("/danhsachloaihang");
          } else {
            this.$router.push("/danhsachloaihang");
          }
        } catch (error) {
          console.log(error);
          alert(error.message || "Có lỗi xảy ra khi thêm chủ đề");
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