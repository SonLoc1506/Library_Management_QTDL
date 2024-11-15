<template>
    <div class="shadow p-3 rounded bg-body">
      <div class="col-md-12 text-primary">
        <h5><span><i class="fa-solid fa-receipt"></i></span> Danh Sách Phiếu Mượn</h5>
        <hr />
      </div>
      <div v-if="phieuMuons.length > 0">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Mã Phiếu Mượn</th>
              <th scope="col">Mã Nhân Viên</th>
              <th scope="col">Số Thẻ Độc Giả</th>
              <th scope="col">Ngày Mượn</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(phieuMuon, index) in phieuMuons" :key="phieuMuon.PhieuMuonID">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ phieuMuon.PhieuMuonID }}</td>
              <td>{{ phieuMuon.NhanVienID }}</td>
              <td>{{ phieuMuon.SoThe }}</td>
              <td>{{ phieuMuon.NgayMuon }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-else>Không có phiếu mượn nào</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      phieuMuons: {
        type: Array,
        required: true,
        default: () => []
      }
    }
  };
  </script>
  
  <style scoped>
  .table-hover tbody tr:hover {
    background-color: #f8f9fa;
  }
  </style>
  