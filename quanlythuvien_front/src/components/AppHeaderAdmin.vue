<template>
  <header>
    <nav id="menu" class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <router-link :to="{ name: 'admin' }" class="navbar-brand logo">
          <img src="@/assets/logo.png" alt="Shop" width="80" height="80">
        </router-link>
        <button class="navbar-toggler icon-tab" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
          aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse col-6" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link :to="{ name: 'DanhSachPhieuMuon' }" class="nav-link">Phiếu mượn
              </router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'DanhSachPhieuMuonChiTiet' }" class="nav-link">Phiếu mượn chi tiết
              </router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{
                name: 'DanhSachSanPham',
              }" class="nav-link">
                Sách
              </router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{
                name: 'DanhSachChuDe',
              }" class="nav-link">
                Danh mục thể loại
              </router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{
                name: 'DanhSachTheThuVien',
              }" class="nav-link">
                Danh sách thẻ thư viện
              </router-link>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" id="dropdownMenuButton2"
                aria-expanded="false">
                Danh sách người dùng
              </a>
              <div class="dropdown-menu row mt-4 danhsach" aria-labelledby="dropdownMenuButton2">
                <div class="col">
                  <router-link :to="{
                    name: 'DanhSachTacGia',
                  }" class="dropdown-item">
                    <span class="dropdown-item">
                      Danh sách tác giả
                    </span>
                  </router-link>
                </div>

                <div class="col">
                  <router-link :to="{
                    name: 'DanhSachDocGia',
                  }" class="dropdown-item">
                    <span class="dropdown-item">
                      Danh sách độc giả
                    </span>
                  </router-link>
                </div>

                <div class="col">
                  <router-link :to="{
                    name: 'DanhSachNhanVien',

                  }" class="dropdown-item">
                    <span class="dropdown-item" v-if="role == 'Admin'">
                      Danh sách nhân viên
                    </span>
                  </router-link>
                </div>

                <div class="col">
                  <router-link :to="{
                    name: 'DanhSachNXBb',
                  }" class="dropdown-item">
                    <span class="dropdown-item">
                      Danh sách nhà xuất bản
                    </span>
                  </router-link>
                </div>
              </div>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" id="dropdownMenuButton2"
                aria-expanded="false">
                Tài khoản
              </a>
              <div class="dropdown-menu row mt-4 danhsach" aria-labelledby="dropdownMenuButton2">
                <div class="col">
                  <router-link :to="{
                    name: 'DanhSachTaiKhoan',
                  }" class="dropdown-item">
                    <span class="dropdown-item">Tài khoản</span>
                  </router-link>
                </div>

                <div class="col">
                  <router-link :to="{
                    name: 'DanhSachTaiKhoanViPham',
                  }" class="dropdown-item">
                    <span class="dropdown-item">
                      Danh sách độc giả vi phạm
                    </span>
                  </router-link>
                </div>

                <div class="col">
                  <router-link :to="{
                    name: 'ThongKeMuonSach',
                  }" class="dropdown-item">
                    <span class="dropdown-item">Thống kê mượn sách</span>
                  </router-link>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <ul class="navbar-nav" id="nguoidung" v-if="this.user">
          <li class="nav-item dropdown danhsachnguoidung">
            <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" id="dropdownMenuButton1"
              aria-expanded="false">
              <!-- Admin {{this.admin.hoten}} -->
              {{ this.user.username }}
            </a>
            <div class="dropdown-menu container danhsach" aria-labelledby="dropdownMenuButton1">
              <a class="dropdown-item dangxuat" @click="logout">Đăng xuất</a>
            </div>
          </li>
        </ul>
      </div>

    </nav>
  </header>
</template>
<style scoped>
@import "@/assets/stype.css";

.danhsach {
  background-color: #539590;
  max-width: max-content;
  font-weight: 600;
}

.danhsach :hover {
  margin-right: 4;
  color: black;
  font-weight: bolder;
  font-size: large;
  background-color: #539590;
}

.dangxuat {
  cursor: pointer;
}
</style>

<script>
import InputSearch from '@/components/InputSearch.vue';
// import authService from "@/services/auth.service";
export default {
  components: {
    InputSearch
  },
  props: ["session_admin"],
  data() {
    return {
      user: null,
      role: null
    };
  },
  methods: {

    async logout() {
      try {
        // const document =  await nhanvienService.logout();
        // this.$store.commit('setSessionAdmin', null);
        localStorage.clear();
        this.user = null;
        this.$router.push({ path: "/admin/dangnhap" });
      } catch (e) {
        console.log("Lỗi " + e);
      }
    },
    async getRole() {
      try {
        const data = JSON.parse(localStorage.getItem("user"));
        if (data && data.user) {
          this.user = data.user;
          this.role = this.user.role;
        } else {
          // Chuyển hướng đến trang đăng nhập nếu không tìm thấy user
          this.$router.push({ path: "/admin/dangnhap" });
        }
      } catch (error) {
        console.log("Lỗi: " + error);
        this.$router.push({ path: "/admin/dangnhap" });
      }

      // if(this.session_admin && this.session_admin.id!=null){
      //   try {
      //     console.log(this.session_admin);

      //       // lấy danh sách admin
      //     this.admin = await nhanvienService.getById(this.session_admin.id);  //this.session_admin.id không chấm được để lấy id để getout
      //     if(this.admin==null){
      //       this.$store.commit('setSessionAdmin', null);
      //       this.admin=null;
      //       this.$router.push({ path: "/admin/dangnhap" });
      //     }
      //   } catch (error) {
      //       console.log(error);
      //   }
      // }
    },

  },
  mounted() {
    this.getRole();
  },
}
</script>