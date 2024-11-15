<template>
  <div class="shadow p-3 rounded bg-body">
    <div class="col-md-12 text-primary">
      <h5><span><i class="fa-solid fa-file-alt"></i></span> Danh Sách Chi Tiết Phiếu Mượn</h5>
      <hr />
    </div>
    <div v-if="phieuMuonChiTiets.length > 0">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Mã Phiếu Mượn</th>
            <th scope="col">Số thẻ</th>
            <th scope="col">Tên độc giả</th>
            <th scope="col">ISBN</th>
            <th scope="col">Tên Sách</th>
            <th scope="col">Ngày Trả</th>
            <th scope="col">Đã Trả</th>
            <th scope="col">Ghi Chú</th>
            <th scope="col">Hành Động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(chiTiet, index) in phieuMuonChiTiets" :key="chiTiet.PhieuMuonID + chiTiet.ISBN">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ chiTiet.PhieuMuonID }}</td>
            <td>{{ chiTiet.SoThe }}</td>
            <td>{{ chiTiet.TenDocGia }}</td>
            <td>{{ chiTiet.ISBN }}</td>
            <td>{{ chiTiet.TenSach }}</td>
            <td>{{ formatDate(chiTiet.NgayTra) }}</td>
            <td>{{ chiTiet.DaTra ? 'Có' : 'Chưa' }}</td>
            <td>{{ chiTiet.Note }}</td>
            <td>
              <button class="btn btn-primary"
                @click="updateLoanBookDetail(chiTiet.PhieuMuonID, chiTiet.ISBN)">Sửa</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-else>Không có chi tiết phiếu mượn nào</p>
  </div>
</template>

<script>
export default {
  props: {
    phieuMuonChiTiets: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  methods: {
    updateLoanBookDetail(id, ISBN) {
      this.$emit('updateLoanBookDetail', id, ISBN);
    },
    formatDate(date) {
      const d = new Date(date);
      return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
    }
  }
};
</script>

<style scoped>
.table-hover tbody tr:hover {
  background-color: #f8f9fa;
}
</style>