<template>
  <div class="shadow p-3 rounded bg-body">
    <div v-if="libraryCards.length > 0">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Số Thẻ</th>
            <th scope="col">Tên Độc Giả</th>
            <th scope="col">Ngày Bắt Đầu</th>
            <th scope="col">Ngày Kết Thúc</th>
            <th scope="col">Ghi Chú</th>
            <th scope="col">Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(card, index) in libraryCards" :key="card.SoThe">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ card.SoThe }}</td>
            <td>{{ card.TenDocGia }}</td>
            <td>{{ formatDate(card.Start_date) }}</td>
            <td>{{ formatDate(card.End_date) }}</td>
            <td>{{ card.Note }}</td>
            <td>
              <button class="btn btn-warning btn-sm me-2" @click="updateLibraryCard(card.SoThe)">Sửa</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-else>Không có thẻ thư viện nào</p>
  </div>
</template>

<script>
export default {
  props: {
    libraryCards: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  methods: {
    async updateLibraryCard(SoThe) {
      this.$emit("updateLibraryCard", SoThe);
    },
    formatDate(date) {
      const d = new Date(date);
      return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
    }
  },
  mounted() {
    console.log("LibraryCards prop:", this.libraryCards);
  }
};
</script>

<style scoped>
.table-hover tbody tr:hover {
  background-color: #f8f9fa;
}
</style>