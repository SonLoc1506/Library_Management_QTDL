<template>
<header>
  <nav id="menu" class="navbar navbar-expand-lg">
  <div class="container-fluid">
    <router-link :to="{ name: 'admin' }" class="navbar-brand logo">
            <img src="@/assets/logo.png" alt="Pet Shop" width="80" height="80">
          </router-link>
      <button class="navbar-toggler icon-tab" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
  </div>
  </nav>
  </header>
  <main>
    <div class="contaner" id="dangnhap"> 
        <div class="row">
            <div class="col-6">
                <div class="container quangcao">
                    <div class="row">
                        <h1>Để quản Lý thư viện <br/> </h1>
                    </div>
                    <div class="row">
                        <h4>Vui lòng đăng nhập</h4>
                        <h4></h4>
                    </div>
                </div>
            </div>
            <div class="col-6">
            <FormDangNhapAdmin
            @login="login"
            />
        </div>
    </div>
        </div>
  </main>
  <AppFooterAmin/>
</template>
<style>
 @import "@/assets/stype.css"; 
 .lkfooter .copy{
  margin-left: 2rem;
  margin-top: 1rem;
    color: rgb(57, 55, 55);
    margin-bottom: 6rem;
   
}
</style>
<script>
import FormDangNhapAdmin from "@/components/FormDangNhapAdmin.vue";
import AppFooterAmin from "@/components/AppFooterAdmin.vue"; 
import authService from "../services/auth.service";
export default {
    components: {
       FormDangNhapAdmin,
       AppFooterAmin, 
    },
    props: ["session_admin", "session_user"],
    data() {
            return {
                admin: this.session_admin || null,
            };
        },
        methods: {
  async login(data) {
    try {
      console.log(data);
      
      const createdData = await authService.login(data);
      console.log(createdData.data);
      
      if (createdData) {
        localStorage.setItem("user", JSON.stringify({
          user: createdData.data
        }
        ))
        this.$router.push({ path: "/" });;
        // console.log(createdData.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert('Email hoặc mật khẩu không chính xác');
      } else {
        alert('Lỗi dữ liệu, xin vui lòng thử lại');
      }
    }
  }
}
}
</script>