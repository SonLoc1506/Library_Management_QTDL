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
            <div class="col-md-12 text-success">
              <h5><span><i class="fa-solid fa-building"></i></span> Danh Sách Nhà Xuất Bản</h5>
              <hr>
            </div>
            <publisherList 
            :nxbs="filteredNxbList"
            @publisherDeleted="removePublisherFromList"
            @updatePublisher="updatePublisher"
             />
          </div>
          <div class="row mb-3 thanhbutton">
            <button class="btn btn-sm btn-primary col-2 m-3" @click="refreshList">
              <i class="fas fa-redo"></i> Làm mới
            </button>
            <button class="btn btn-sm btn-success col-2 m-3" @click="goToAddPublisher">
              <i class="fas fa-plus"></i> Thêm mới
            </button>
            <!-- <button class="btn btn-sm btn-danger col-2 m-3" @click="removeAllNxb">
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
import InputSearchAdmin from "@/components/InputSearchAdmin.vue";
import publisherList from "@/components/publisherList.vue";
import PublisherService from "@/services/publisher.service";
export default {
  components: {
    AppHeaderAdmin,
    AppFooterAdmin,
    InputSearchAdmin,
    publisherList
  },
  props: ["session_admin"],
  data() {
    return {
      nxbList: [], // dữ liệu nhà xuất bản
      searchText: "",
      add: false,
      mode: "create"
    };
  },
  computed: {
    filteredNxbList() {
      if (!this.searchText) return this.nxbList;
      const searchTextLower = this.searchText.toLowerCase();
      return this.nxbList.filter(nxb =>
        nxb.TenNXB.toLowerCase().includes(searchTextLower)
      );
      // console.log("Filtered nxbs:", filtered);
      // return filtered;
    }
  },
  methods: {
    async refreshList() {
      try {
        const response = await PublisherService.getAll();
        console.log(response);
        this.nxbList = response.data;
        console.log(this.nxbList);
      } catch (error) {
        console.error("Error fetching publishers:", error);
      }
    },
    // async addPublisher(data) {
    //   try {
    //     const createdData = await PublisherService.create(data);
    //     // router.push.... den trang danh sach chu de
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    goToAddPublisher() {
      this.$router.push('/addpublisher');
    },
  
    async removePublisherFromList(NXB_ID) {
      if (confirm("Bạn muốn xóa nhà xuất bản này?")) {
        try {
          // const
          await PublisherService.delete(NXB_ID);
          this.nxbList = this.nxbList.filter(
            (nxb) => nxb.NXB_ID !== NXB_ID
          );
        } catch (err) {
          console.log(err);
        }
      }
    },
    async updatePublisher(NXB_ID) {
      if (confirm("Bạn muốn sửa nhà xuất bản này?")) {
        this.$router.push(`/editnxb/${NXB_ID}`);  
      }
    },
  },
  mounted() {
    this.refreshList(); // gọi làm mới danh sách khi trang được tải
  }
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
