<template>
  <div>
    <AppHeaderAdmin :session_admin="session_admin" />
    <main class="main-admin">
      <div id="hdsd">
        <div class="col-4 offset-1 mt-3 danhsachsanpham">
          <InputSearchAdmin v-model="this.searchText" />
        </div>
      </div>
      <div class="row">
        <div class="col-10 mt-3 offset-1">
          <div class="shadow p-3 rounded bg-body">
            <div class="col-md-12 text-primary">
              <h5>
                <span><i class="fa-solid fa-tags"></i></span> Danh Sách Thể Loại
              </h5>
              <hr />
            </div>
            <genresList :genres="filteredGenres" @genreDeleted="removeGenreFromList" @updateGenre="updateGenre" />
            <!-- <genresList :genres="genres" /> -->
          </div>
          <div class="row mb-3 thanhbutton">
            <button class="btn btn-sm btn-primary col-2 m-3" @click="refreshList">
              <i class="fas fa-redo"></i> Làm mới
            </button>
            <button class="btn btn-sm btn-success col-2 m-3" @click="goToAddGenre">
              <i class="fas fa-plus"></i> Thêm mới
            </button>
          </div>
        </div>
      </div>
    </main>
    <AppFooterAdmin />
  </div>
</template>

<script>
import AppHeaderAdmin from "@/components/AppHeaderAdmin.vue";
import AppFooterAdmin from "@/components/AppFooterAdmin.vue";
import genresList from "@/components/genresList.vue";
import InputSearchAdmin from "@/components/InputSearchAdmin.vue";
import axios from "axios";
import genresService from "@/services/genres.service";

export default {
  components: {
    AppHeaderAdmin,
    AppFooterAdmin,
    InputSearchAdmin,
    genresList,
  },
  data() {
    return {
      genres: [], // Dữ liệu thể loại
      searchText: "",
      add: false,
      mode: "create",
      session_admin: null
    };
  },
  computed: {
    filteredGenres() {
      if (!this.searchText) return this.genres;
      const searchTextLower = this.searchText.toLowerCase();
      const filtered = this.genres.filter((genre) =>
        genre.TenChuDe.toLowerCase().includes(searchTextLower)
      );

      console.log("Filtered genres:", filtered);

      return filtered;
    },
  },
  methods: {
    async refreshList() {
      try {
        const response = await genresService.getAll();
        console.log("Genres data:", response.data);
        this.genres = response.data;
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    },
    // async getGenres() {
    //   try {
    //     const createdData = await genresService.getAll();
    //     console.log(createdData.data);

    //     if (createdData) {
    //       this.genres = createdData.data;
    //     }
    //   } catch (error) {
    //     if (error.response && error.response.status === 404) {
    //       alert("Email hoặc mật khẩu không chính xác");
    //     } else {
    //       alert("Lỗi dữ liệu, xin vui lòng thử lại");
    //     }
    //   }
    // },
    async addGenre(data) {
      try {
        const createdData = await genresService.create(data);
        this.$router.push('/danhsachchude');
      } catch (error) {
        console.log(error);
      }
    },
    goToAddGenre() {
      this.$router.push("/addgenre");
    },
    // async getGenreById() {
    //   try {
    //     const getdata = await genresService.getById(data.id);
    //     console.log(getdata);
    //     if (getdata) {
    //       localStorage.setItem("user", JSON.stringify({ user: getdata.data }));
    //     }
    //   } catch (error) {
    //     if (error.response && error.response.status === 404) {
    //       alert("Email hoặc mật khẩu không chính xác");
    //     } else {
    //       alert("Lỗi dữ liệu, xin vui lòng thử lại");
    //     }
    //   }
    // },
    async removeGenreFromList(ChuDeID) {
      if (confirm("Bạn muốn xóa thể loại này?")) {
        try {
          // const
          await genresService.delete(ChuDeID);
          this.genres = this.genres.filter(
            (genre) => genre.ChuDeID !== ChuDeID
          );
        } catch (err) {
          console.log(err);
        }
      }
    },
    async updateGenre(ChuDeID) {
      this.$router.push(`/editgenre/${ChuDeID}`);
    },
  },
  mounted() {
    this.refreshList(); // Gọi khi trang được tải
  },
};
</script>
