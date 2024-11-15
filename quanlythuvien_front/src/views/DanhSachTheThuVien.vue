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
              <h5> <span><i class="fa-solid fa-id-card"></i></span> Danh Sách Thẻ Thư Viện</h5>
              <hr>
            </div>
            <libraryCardList :libraryCards="filteredLibraryCards" @libraryCardDeleted="removelibraryCardFromList"
              @updateLibraryCard="updateLibraryCard" />
          </div>
          <div class="row mb-3 thanhbutton">
            <button class="btn btn-sm btn-primary col-2 m-3" @click="refreshList">
              <i class="fas fa-redo"></i> Làm mới
            </button>
            <!-- <button class="btn btn-sm btn-success col-2 m-3" @click="goToAddlibraryCard">
              <i class="fas fa-plus"></i> Thêm mới
            </button> -->
            <!-- <button class="btn btn-sm btn-danger col-2 m-3" @click="removeAllLibraryCard">
                <i class="fas fa-trash"></i> Xóa tất cả
              </button> -->
          </div>
        </div>
        <!-- Thêm các phần tử khác như form chỉnh sửa hoặc thêm mới ở đây -->
      </div>
    </main>
    <AppFooterAdmin />
  </div>
</template>

<script>
import AppHeaderAdmin from "@/components/AppHeaderAdmin.vue";
import AppFooterAdmin from "@/components/AppFooterAdmin.vue";
import libraryCardList from "@/components/libraryCardList.vue";
import InputSearchAdmin from "@/components/InputSearchAdmin.vue";
import LibraryCardService from "@/services/LibraryCard.service";

export default {
  components: {
    AppHeaderAdmin,
    AppFooterAdmin,
    InputSearchAdmin,
    libraryCardList
  },
  props: ["session_admin"],
  data() {
    return {
      libraryCards: [], // dữ liệu thẻ thư viện
      searchText: "",
      add: false,
      mode: "create"
    };
  },
  computed: {
    filteredLibraryCards() {
      if (!this.searchText) return this.libraryCards;
      const searchTextLower = this.searchText.toLowerCase();
      return this.libraryCards.filter(card =>
        card.card_number.toLowerCase().includes(searchTextLower)
      );
    },
  },
  methods: {
    async refreshList() {
      try {
        const response = await LibraryCardService.getAll();
        console.log("LibraryCards data:", response.data);
        this.libraryCards = response.data;
      } catch (error) {
        console.error("Error fetching libraryCards:", error);
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
    async addlibraryCard(data) {
      try {
        const createdData = await LibraryCardService.create(data);
        // router.push.... den trang danh sach chu de
      } catch (error) {
        console.log(error);
      }
    },
    async getLibraryCards() {
      const response = await LibraryCardService.getAll();
      this.libraryCards = response.data;
      console.log(this.libraryCards);
    },
    // goToAddlibraryCard() {
    //   this.add = true;
    //   this.mode = "create";
    // },

    async removelibraryCardFromList(SoThe) {
      if (confirm("Bạn muốn xóa thẻ thư viện này?")) {
        try {
          // const
          await LibraryCardService.delete(SoThe);
          this.libraryCards = this.libraryCards.filter(
            (libraryCard) => libraryCard.SoThe !== SoThe
          );
        } catch (err) {
          console.log(err);
        }
      }
    },
    async updateLibraryCard(SoThe) {
      this.$router.push(`/editthethuvien/${SoThe}`);
    }
  },
  mounted() {
    this.refreshList(); // gọi làm mới danh sách khi trang được tải
  }
};
</script>