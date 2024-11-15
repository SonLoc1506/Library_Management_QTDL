<template>
  <div class="p-3 rounded bg-body">
    <div v-if="genres.length > 0">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">ID Thể Loại</th>
            <th scope="col">Tên Thể Loại</th>
            <th scope="col">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <!-- Changed "genres" to "genre" to avoid confusion -->
          <tr v-for="(genre, index) in genres" :key="genre.ChuDeID">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ genre.ChuDeID }}</td>
            <td>{{ genre.TenChuDe }}</td>
            <td>
              <button class="btn btn-warning btn-sm me-2" @click="updateGenre(genre.ChuDeID)">Sửa</button>
              <button class="btn btn-danger btn-sm" @click="deleteGenre(genre.ChuDeID)"><i class="fas fa-trash"></i>Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-else>Không có thể loại nào</p>
  </div>
</template>

<script>
// import genresService from "@/services/genres.service";
// import genresService from "@/services/genres.service";
export default {
  props: {
    genres: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  methods: {
    async deleteGenre(ChuDeID) {
      this.$emit("genreDeleted", ChuDeID);
    },
    async updateGenre(ChuDeID) {
      this.$emit("updateGenre", ChuDeID);
      // this.$router.push(`/addgenres`);
    },
  },
  mounted() {
    console.log("Genres prop:", this.genres);
  },
};
</script>

<style scoped>
.table-hover tbody tr:hover {
  background-color: #f8f9fa;
}
</style>
