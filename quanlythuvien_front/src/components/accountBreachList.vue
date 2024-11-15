<template>
  <div class="p-3 rounded bg-body">
    <div v-if="accountBreaches.length > 0">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">ID</th>
            <th scope="col">Ngày Khóa</th>
            <th scope="col">Ngày Mở Khóa</th>
            <th scope="col">Lý Do</th>
            <th scope="col">Số Thẻ</th>
            <th scope="col">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(breach, index) in accountBreaches" :key="breach.ID">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ breach.ID }}</td>
            <td>{{ formatDate(breach.NgayKhoa) }}</td>
            <td>{{ formatDate(breach.NgayMoKhoa) }}</td>
            <td>{{ breach.LyDo }}</td>
            <td>{{ breach.SoThe }}</td>
            <td>
              <button class="btn btn-warning btn-sm me-2" @click="updateAccountBreach(breach.ID)">Sửa</button>
              <button class="btn btn-danger btn-sm" @click="deleteAccountBreach(breach.ID)"><i class="fas fa-trash"></i> Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-else>Không có vi phạm nào</p>
  </div>
</template>

<script>
export default {
  props: {
    accountBreaches: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  methods: {
    async deleteAccountBreach(ID) {
      this.$emit("breachDeleted", ID);
    },
    async updateAccountBreach(ID) {
      this.$emit("updateBreach", ID);
    },
    formatDate(date) {
      const d = new Date(date);
      return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
    }
  },
  mounted() {
    console.log("Account Breaches prop:", this.accountBreaches);
  },
};
</script>

<style scoped>
.table-hover tbody tr:hover {
  background-color: #f8f9fa;
}
</style>