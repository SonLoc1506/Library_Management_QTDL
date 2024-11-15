<template>
  <div>
    <AppHeaderAdmin :session_admin="session_admin" />
    <main>
      <div v-if="nguoidung==null">
      <div class="container phancach mt-10">
          <div clas="pchr" >
              <hr style="width: 5rem;flex-grow: 1; height: 3px; margin-right: 1rem;">
          </div>
           <h5 class=" mb-2 text-giohang">Thêm Nhân Viên</h5>
          <div clas="pchr">
              <hr style="width: 5rem;flex-grow: 1; height: 3px;margin-left: 1rem;">
          </div>
      </div>
      <!--Trang Form edit/thêm-->
      <FormNguoiDung
          :nguoidung="nguoidung"
          :mode="mode"
          @submit:nguoidung="createnguoidung"
      /> <!--truyen phuoc thuc cho submit -> tao moi hoac update hoac delete-->
      <p>{{ message }}</p>
  </div>
    </main>
 
    <AppFooterAdmin/>
  </div>
</template>

<script>
import AppHeaderAdmin from "@/components/AppHeaderAdmin.vue";
import AppFooterAdmin from "@/components/AppFooterAdmin.vue";
import FormNguoiDung from "@/components/FormNguoiDung.vue";
import employeeService from "@/services/employee.service";;
export default {
  components: {
    AppHeaderAdmin,
    AppFooterAdmin,
    FormNguoiDung,
  },
  props: ["session_admin"],
  data() {
          return {
              nguoidung: null, // du lieu truyen vao form
              message: "",
              mode:'create', // du lieu truyen vao form
              
          };
      },
      methods: {
          async createnguoidung(data) {  // ham goi submit
              try {
                const document =   await employeeService.create(data);
                // console.log("id người dùng " + document.insertedId);
                this.message = "Thêm thành công";
                alert(this.message);  // thông báo thành công
                this.$router.push("/danhsachnhanvien");
              } catch (error) {
                if(error.response && error.response.status === 400){
                  alert('email đã được sử dụng.')
                    }
                else{
                  alert('Lỗi dữ liệu, Xin vui lòng thử lại')
                }
                console.log(error);
              }
          },
          
      },
      // beforeMount(){
      //   if(this.session_admin!=null && (this.session_admin.quyen==0 || this.session_admin.quyen==2 || this.session_admin.quyen==3)){
      //     alert('Bạn không có quyền truy cập vào quản lý nhân viên của cửa hàng');
      //     this.$router.push({ path: "/admin" });
      //   }
      // }
};
</script>
<style>
.text-giohang{
font-size: 3rem;
color: #659fa5;
}
.phancach{
  margin-top: 3rem;
}
</style>
