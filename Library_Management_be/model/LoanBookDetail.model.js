import connection from "../config/db.js";

const LoanBookDetail = {
  getAll: (callback) => {
    connection.query(`SELECT * 
FROM PhieuMuonChiTiet pmct
JOIN Sach s ON pmct.ISBN=s.ISBN
JOIN PhieuMuon pm ON pmct.PhieuMuonID = pm.PhieuMuonID
JOIN TheThuVien ttv ON pm.SoThe = ttv.SoThe
JOIN DocGia dg ON ttv.SoThe = dg.SoThe;
    `, callback);
  },

  getById: (PhieuMuonID, ISBN, callback) => {
    connection.query(
      "SELECT * FROM PhieuMuonChiTiet WHERE PhieuMuonID = ? AND ISBN = ?",
      [PhieuMuonID, ISBN],
      callback
    );
  },

  getBookExist: (ISBN, id, callback) => {
    connection.query(
      "SELECT * FROM PhieuMuonChiTiet WHERE ISBN = ? AND PhieuMuonID = ?",
      [ISBN, id],
      callback
    );
  },

  update: (PhieuMuonID, ISBN, NgayTra, DaTra, Note, ODL_ISBN, callback) => {
    connection.query(
      "UPDATE PhieuMuonChiTiet SET ISBN = ?, NgayTra = ?, DaTra = ?, Note = ? WHERE PhieuMuonID = ? AND ISBN = ?",
      [ISBN, NgayTra, DaTra, Note, PhieuMuonID, ODL_ISBN],
      callback
    );
  },
};

export default LoanBookDetail;
