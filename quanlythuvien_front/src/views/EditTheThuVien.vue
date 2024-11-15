<template>
  <div>
    <AppHeaderAdmin :session_admin="session_admin" />
    <main>
      <div v-if="card !== null">
        <div class="container phancach mt-10">
          <div class="pchr">
            <hr style="width: 5rem;flex-grow: 1; height: 3px; margin-right: 1rem;">
          </div>
          <h5 class="mb-2 text-giohang">Chỉnh Sửa Thẻ Thư Viện</h5>
          <div class="pchr">
            <hr style="width: 5rem;flex-grow: 1; height: 3px;margin-left: 1rem;">
          </div>
        </div>

        <div class="container">
          <form @submit.prevent="updateLibraryCard" v-if="card">
            <div class="form-group">
              <label>Số Thẻ</label>
              <input type="text" class="form-control" v-model="card.SoThe" readonly>
            </div>

            <div class="form-group">
              <label>Ngày Bắt Đầu</label>
              <input type="date" class="form-control" v-model="formattedStartDate" required>
            </div>

            <div class="form-group">
              <label>Ngày Kết Thúc</label>
              <input type="date" class="form-control" v-model="formattedEndDate" required>
            </div>

            <div class="form-group">
              <label>Ghi Chú</label>
              <textarea class="form-control" v-model="card.Note"></textarea>
            </div>

            <div class="mt-3">
              <button type="submit" class="btn btn-primary me-2">Cập Nhật</button>
              <!-- <button type="button" class="btn btn-danger" @click="deleteCard">Xóa</button> -->
            </div>
          </form>
        </div>

        <p class="text-success">{{ message }}</p>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
    </main>
    <AppFooterAdmin />
  </div>
</template>

<script>
import AppHeaderAdmin from "@/components/AppHeaderAdmin.vue";
import AppFooterAdmin from "@/components/AppFooterAdmin.vue";
import LibraryCardService from "@/services/LibraryCard.service";

export default {
  components: {
    AppHeaderAdmin,
    AppFooterAdmin
  },
  props: ["session_admin"],
  data() {
    return {
      card: null,
      message: ""
    };
  },
  methods: {
    async getLibraryCards() {
      try {
        const id = this.$route.params.SoThe;


        const response = await LibraryCardService.getByCardNumber(id);
        console.log(response);

        if (response && response.data) {
          this.card = response.data;
        } else {
          throw new Error("Invalid card data received");
        }
      } catch (error) {
        console.log(error);
        this.$router.push("/notfound");
      }
    },
    async updateLibraryCard() {
      try {
        const { Start_date, End_date, Note } = this.card;
        if (!Start_date || !End_date) {
          throw new Error("Please fill in all required fields");
        }

        const response = await LibraryCardService.update(this.card.SoThe, {
          Start_date,
          End_date,
          Note
        });
        
        if (response && response.status === 200) {
          this.message = response.message;
          alert(this.message);
          await this.getLibraryCards();
          this.$router.push("/danhsachthethuvien");
        } else {
          // throw new Error("Update failed");
          alert(response.message);
        }
      } catch (error) {
        console.log(error);
        alert(error.message || "Có lỗi xảy ra khi cập nhật thẻ");
      }
    },
  },
  computed: {
    formattedStartDate: {
      get() {
        if (this.card.Start_date) {
          const date = new Date(this.card.Start_date);
          return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
        }
        return '';
      },
      set(value) {
        this.card.Start_date = value ? new Date(value).toISOString() : null;
      }
    },
    formattedEndDate: {
      get() {
        if (this.card.End_date) {
          const date = new Date(this.card.End_date);
          return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
        }
        return '';
      },
      set(value) {
        this.card.End_date = value ? new Date(value).toISOString() : null;
      }
    }
  }
  ,
  created() {
    this.getLibraryCards();
  }
};
</script>

<style>
.text-giohang {
  font-size: 3rem;
  color: #659fa5;
}

.phancach {
  margin-top: 3rem;
}

.form-group {
  margin-bottom: 1rem;
}
</style>