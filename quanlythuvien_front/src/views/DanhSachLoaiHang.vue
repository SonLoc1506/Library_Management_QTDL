<template>
    <div>
      <AppHeaderAdmin :session_admin="session_admin" />
      <main class="main-admin">
        <div id="hdsd">
          <div class="col-4 offset-1 mt-3 danhsachsanpham">
            <InputSearchAdmin v-model="searchText" />
          </div>
        </div>
        <div class="row">
          <div class="col-10 mt-3 offset-1">
            <div class="shadow p-3 rounded bg-body">
              <div class="col-md-12 text-primary">
                <h5>
                  <span><i class="fa-solid fa-list"></i></span> Danh Sách Thể Loại
                </h5>
                <hr />
              </div>
              <genreList
                :genres="filteredGenres"
                @genreDeleted="removeGenreFromList"
                @updateGenre="updateGenre"
              />
            </div>
            <div class="row mb-3 thanhbutton">
              <button
                class="btn btn-sm btn-primary col-2 m-3"
                @click="refreshList"
              >
                <i class="fas fa-redo"></i> Làm mới
              </button>
              <button
                class="btn btn-sm btn-success col-2 m-3"
                @click="goToAddGenre"
              >
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
  import genreList from "@/components/genresList.vue";
  import InputSearchAdmin from "@/components/InputSearchAdmin.vue";
  import GenreService from "@/services/genres.service";
  
  export default {
    components: {
      AppHeaderAdmin,
      AppFooterAdmin,
      InputSearchAdmin,
      genreList,
    },
    data() {
      return {
        genres: [],
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
        return this.genres.filter((genre) =>
          genre.TenTheLoai.toLowerCase().includes(searchTextLower)
        );
      },
    },
    methods: {
      async refreshList() {
        try {
          const response = await GenreService.getAll();
          console.log(response);
          this.genres = response.data;
          console.log(this.genres);
        } catch (error) {
          console.error("Error fetching genres:", error);
        }
      },
      goToAddGenre() {
        this.$router.push('/addgenre');
      },
      async removeGenreFromList(id) {
        if (confirm("Bạn muốn xóa thể loại này?")) {
          try {
            await GenreService.delete(id);
            this.genres = this.genres.filter((genre) => genre.id !== id);
          } catch (err) {
            console.log(err);
          }
        }
      },
      async updateGenre(id) {
        if (confirm("Bạn muốn sửa thể loại này?")) {
          this.$router.push(`/editgenre/${id}`);  
        }
      },
    },
    mounted() {
      this.refreshList();
    },
  };
  </script>