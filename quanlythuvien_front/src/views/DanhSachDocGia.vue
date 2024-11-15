<template>
    <div>
      <AppHeaderAdmin :session_admin="session_admin" />
      <main class="main-admin">
        <div id="hdsd">
          <div class="col-4 offset-1 mt-3 danhsachdocgia">
            <InputSearchAdmin v-model="this.searchText" />
          </div>
        </div>
        <div class="row">
          <div class="col-10 mt-3 offset-1">
            <div class="shadow p-3 rounded bg-body">
              <div class="col-md-12 text-primary">
                <h5><span><i class="fa-solid fa-user"></i></span> Danh Sách Độc Giả</h5>
                <hr>
              </div>
              <readerList 
              :readers="filteredReaderList"
               @deleteReader="deleteReader" 
               @updateReader="updateReader" />
            </div>
            <div class="row mb-3 thanhbutton">
              <button class="btn btn-sm btn-primary col-2 m-3" @click="refreshList">
                <i class="fas fa-redo"></i> Làm mới
              </button>
              <button class="btn btn-sm btn-success col-2 m-3" @click="goToAddReader">
                <i class="fas fa-plus"></i> Thêm mới
              </button>
              <!-- <button class="btn btn-sm btn-danger col-2 m-3" @click="removeAllReaders">
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
  import readerList from "@/components/readerList.vue";
  import InputSearchAdmin from "@/components/InputSearchAdmin.vue";
  import readerService from "@/services/reader.service";
  
  export default {
    components: {
      AppHeaderAdmin,
      AppFooterAdmin,
      InputSearchAdmin,
      readerList
    },
    props: ["session_admin"],
    data() {
      return {
        readerList: [], // dữ liệu độc giả
        searchText: "",
        add: false,
        mode: "create"
      };
    },
    computed: {
      filteredReaderList() {
        if (!this.searchText) return this.readerList;
        const searchTextLower = this.searchText.toLowerCase();
        return this.readerList.filter(reader =>
          reader.TenDocGia.toLowerCase().includes(searchTextLower)
        );
      }
    },
    methods: {
      async refreshList() {
        try {
          const response = await readerService.getAll();
          console.log("Readers data:", response.data);
          this.readerList = response.data;
          console.log(this.readerList);
        } catch (error) {
          console.error("Error fetching readers:", error);
        }
      },
      // async addReader(data) {
      //   try {
      //     await readerService.create(data);
      //     this.refreshList();
      //   } catch (error) {
      //     console.log(error);
      //   }
      // },
      goToAddReader() {
        this.$router.push('/addreader');
      },
      async deleteReader(DocGiaID) {
        if (confirm("Bạn muốn xóa độc giả này?")) {
          try {
            await readerService.delete(DocGiaID);
            this.readerList = this.readerList.filter(
              (reader) => reader.DocGiaID !== DocGiaID
            );
          } catch (err) {
            console.log(err);
          }
        }
      },
      async updateReader(DocGiaID) {
        if (confirm("Bạn muốn sửa độc giả này?")) {
          this.$router.push(`/editdocgia/${DocGiaID}`);
        }
      },  
      // refreshReaderList() {
      //   this.refreshList();
      // }
    },
    mounted() {
      this.refreshList();
    },
  };
  </script>
  
  <style scoped>
  .thanhbutton {
    text-align: center;
    margin-top: 0;
  }
  #hdsd {
    margin-top: 2rem;
  }
  </style>