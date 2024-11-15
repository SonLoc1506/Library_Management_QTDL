<!-- Mới -->
<template>
  <div class="col-8 offset-2 bieumau">
    <div class="row mt-10">
      <div class="col-12 text-center">
        <h2>Đăng Nhập</h2>
        <hr style="margin-left: 10px; margin-right: 10px;" />
      </div>
    </div>
    <div class="container ml-3">
      <form @submit.prevent="submitForm">
        <div class="row mb-3 mt-3 form-group">
          <label for="email" class="col-sm-12 col-form-label nhaninput">Email:</label>
          <div class="col-12">
            <input
              type="email"
              class="form-control"
              v-model="adminLogin.email"
              required
              name="email"
              id="email"
              placeholder="Nhập email"
            />
          </div>
        </div>
        <div class="row mb-4 form-group mt-2">
          <label for="password" class="col-sm-12 col-form-label nhaninput">Mật khẩu:</label>
          <div class="col-12">
            <input
              type="password"
              class="form-control"
              required
              name="password"
              v-model="adminLogin.password"
              id="password"
              placeholder="Nhập vào mật khẩu"
            />
          </div>
        </div>
        <div class="row input-btn mb-4 form-group mt-4">
          <button type="submit" name="dangnhap" class="btn">Đăng Nhập</button>
        </div>   
      </form>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["login"],
  // props: {
  //   admin: { type: Object, default: null }, // Dữ liệu admin đăng nhập
  // },
  data() {
    return {
      // adminLogin: this.admin || { email: "", password: "" },
      adminLogin: { email: "", password: "" },
    };
  },
  methods: {
    submitForm() {
      // Xử lý sự kiện đăng nhập ở đây
      this.$emit("login", this.adminLogin);
    },
  },
};
</script>



































<!-- <template>
    <div class="col-6 offset-3 bieumau">
      <div class="row mt-10">
           <div clas="col-4">
                    <h2>Đăng Nhập</h2>
                    <hr style="margin-left: 10px; margin-right: 10px;"/>
            </div>
      </div>
      <div class="container ml-3">
          <form @submit.prevent="submitForm">
                <div class="row mb-3 mt-3 form-group">
                      <label for="sdt" class="col-sm-12 col-form-label nhaninput">Tên đăng nhập:</label>
                      <div class="col-12">
                        <input type="text" class="form-control" v-model="adminLogin.sdt" required name="sdt" id="sdt" placeholder="Nhập tên đăng nhập">
                      </div>
                </div>
                <div class="row mb-4 form-group mt-2">
                      <label for="password" class="col-sm-12 col-form-label nhaninput">Mật khẩu:</label>
                      <div class="col-12">
                        <input type="password" class="form-control" required name="pass" v-model="adminLogin.password" id="password" placeholder="Nhập vào mật khẩu">
                      </div>
                </div>
                <div class="row input-btn mb-4 form-group mt-4">
                      <button type="submit" name="dangnhap" class="btn">Đăng Nhập</button>
                </div>
          </form>
          <hr/>
          <div class="row mb-3">
                <div class="col-8">
                    <router-link to="/dangnhap">Trở lại tài khoản khách</router-link>
                </div>
          </div> -->
      <!-- </div>
  </div>
            
</template> -->

<!-- <script>
export default {
  emits: ["login"],
  props: {
    admin: { type: Object, default: null }, // Dữ liệu admin đăng nhập
  },
  data() {
    return {
      adminLogin: this.admin || { sdt: "", password: "" },
    };
  },
  methods: {
    submitForm() {
      // Xử lý sự kiện đăng nhập ở đây
      this.$emit("login", this.adminLogin);
    },
  },
};
</script> -->
