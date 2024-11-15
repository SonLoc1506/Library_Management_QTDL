import { createWebHistory, createRouter } from "vue-router";
//createRouter tạo một thể hiện của Vue Router để quản lý các định tuyến
//createWebHistory được sử dụng để tạo một loại lịch sử định tuyến
import TrangChu from '@/views/TrangChu.vue'
import store from '@/store';
import Admin from '@/views/Admin.vue'
import DanhSachSanPham from '@/views/DanhSachSanPham.vue';
import DanhSachNhanVien from '@/views/DanhSachNhanVien.vue';
import AdminDangNhap from '@/views/AdminDangNhap.vue';
import AddSanPham from '@/views/AddSanPham.vue';
import EditSanPham from '@/views/EditSanPham.vue';
import AddNhanVien from '@/views/AddNhanVien.vue';
import DanhSachLoaiHang from '@/views/DanhSachLoaiHang.vue';
import DanhSachDocGia from "@/views/DanhSachDocGia.vue";
import DanhSachChuDe from "@/views/DanhSachChuDe.vue";
import DanhSachNXBb from "@/views/DanhSachNXBb.vue";
import DanhSachTacGia from "@/views/DanhSachTacGia.vue";
import DanhSachTaiKhoanViPham from "@/views/DanhSachTaiKhoanViPham.vue";
import DanhSachTaiKhoan from "@/views/DanhSachTaiKhoan.vue";
import EditTacGia from "@/views/EditTacGia.vue";
import DanhSachPhieuMuon from "@/views/DanhSachPhieuMuon.vue";
import DanhSachPhieuMuonChiTiet from "@/views/DanhSachPhieuMuonChiTiet.vue";
import DanhSachTheThuVien from "@/views/DanhSachTheThuVien.vue";
import EditDocGia from "@/views/EditDocGia.vue";
import EditNXB from "@/views/EditNXB.vue";
import EditChuDe from "@/views/EditChuDe.vue";
import EditNhanVien from "@/views/EditNhanVien.vue";
import EditTheThuVien from "@/views/EditTheThuVien.vue";
import EditTaiKhoanViPham from "@/views/EditTaiKhoanViPham.vue";
import EditPhieuMuon from "@/views/EditPhieuMuon.vue";
import AddBook from "@/views/addBook.vue";
import AddGenre from "@/views/addGenre.vue";
import AddAuthor from "@/views/addAuthor.vue";
import AddReader from "@/views/addReader.vue";
import AddPublisher from "@/views/addPublisher.vue";
import AddAccountBreach from "@/views/addAccountBreach.vue";
import EditLoanBookDetail from "@/views/EditLoanBookDetail.vue";
import AddLoanBook from "@/views/AddLoanBook.vue";
import EditTaiKhoan from "@/views/EditTaiKhoan.vue";
import AddAccount from "@/views/AddAccount.vue";
import ThongKeMuonSach from "@/views/ThongKeMuonSach.vue";


const routes = [
  {
    path: "/",
    name: "trangchu",
    component: TrangChu,
    beforeEnter: (to, from, next) => {
      next('/admin');

    },
  },

  {
    path: "/admin",
    name: "admin",
    component: Admin,
    // beforeEnter: (to, from, next) => {
    //     // Kiểm tra xem người dùng đã đăng nhập thành công chưa

  },
  {
    path: "/thongkemuonsach",
    name: "ThongKeMuonSach",
    component: ThongKeMuonSach,
    beforeEnter: (to, from, next) => {
      const data = JSON.parse(localStorage.getItem("user"));
      if (data && data.user) {
        next();
      } else {
        next('/admin/dangnhap');
      }
    },
  },
  {
    path: "/danhsachphieumuonchitiet",
    name: "DanhSachPhieuMuonChiTiet",
    component: DanhSachPhieuMuonChiTiet,
    beforeEnter: (to, from, next) => {
      const data = JSON.parse(localStorage.getItem("user"));
      if (data && data.user) {
        next();
      } else {
        next('/admin/dangnhap');
      }
    },
  },
  {
    path: "/edittaikhoan/:id",
    name: "edittaikhoan",
    component: EditTaiKhoan,
    beforeEnter: (to, from, next) => {
      const data = JSON.parse(localStorage.getItem("user"));
      if (data && data.user) {
        next();
      } else {
        next('/admin/dangnhap');
      }
    },
  },
  {
    path: "/addaccount",
    name: "addaccount",
    component: AddAccount,
    beforeEnter: (to, from, next) => {
      const data = JSON.parse(localStorage.getItem("user"));
      if (data && data.user) {
        next();
      } else {
        next('/admin/dangnhap');
      }
    },
  },
  {
    path: "/editloanbookdetail/:id&:ISBN",
    name: "editloanbookdetail",
    component: EditLoanBookDetail,
    beforeEnter: (to, from, next) => {
      const data = JSON.parse(localStorage.getItem("user"));
      if (data && data.user) {
        next();
      } else {
        next('/admin/dangnhap');
      }
    },
  },
  {
    path: "/danhsachsanpham",
    name: "DanhSachSanPham",
    component: DanhSachSanPham,
    beforeEnter: (to, from, next) => {
      // Kiểm tra xem người dùng đã đăng nhập thành công chưa
      const data = JSON.parse(localStorage.getItem("user"));
      if (data && data.user) {
        // Đã đăng nhập, chuyển hướng đến trang chính
        next();
      } else {
        // Chưa đăng nhập, cho phép truy cập trang đăng nhập
        next('/admin/dangnhap');
      }
    }, // trang hiển thị
  },
  {
    path: "/editsanpham/:ISBN",
    name: "editsanpham",
    component: EditSanPham, // trang hiển thị
    beforeEnter: (to, from, next) => {
      // Kiểm tra xem người dùng đã đăng nhập thành công chưa
      const data = JSON.parse(localStorage.getItem("user"));
      if (data && data.user) {
        // Đã đăng nhập, chuyển hướng đến trang chính
        next();
      } else {
        // Chưa đăng nhập, cho phép truy cập trang đăng nhập
        next('/admin/dangnhap');
      }
    }, // trang hiển thị
  },
  // {
  //   path: "/editloanbookdetail/:id",
  //   name: "editloanbookdetail",
  //   component: EditLoanBookDetail, //  trang hiển thị
  //   beforeEnter: (to, from, next) => {
  //     // Kiểm tra xem người dùng đã đăng nhập thành công chưa
  //       const data = JSON.parse(localStorage.getItem("user"));
  //       if (data && data.user) {
  //       next();
  //     } else {
  //       next('/admin/dangnhap');
  //     }
  //   }, // trang hiển thị  
  // },  
  {
    path: "/edittacgia/:TacGiaId",
    name: "edittacgia",
    component: EditTacGia, // trang hiển thị
    beforeEnter: (to, from, next) => {
      // Kiểm tra xem người dùng đã đăng nhập thành công chưa
      const data = JSON.parse(localStorage.getItem("user"));
      if (data && data.user) {
        // Đã đăng nhập, chuyển hướng đến trang chính
        next();
      } else {
        // Chưa đăng nhập, cho phép truy cập trang đăng nhập
        next('/admin/dangnhap');
      }
    }, // trang hiển thị
  },
  {
    path: "/addloanbook",
    name: "addloanbook",
    component: AddLoanBook, // trang hiển thị
    beforeEnter: (to, from, next) => {
      // Kiểm tra xem người dùng đã đăng nhập thành công chưa
      const data = JSON.parse(localStorage.getItem("user"));
      if (data && data.user) {
        next();
      } else {
        next('/admin/dangnhap');
      }
    }, // trang hiển thị    
  },
  {
    path: "/addpublisher",
    name: "addpublisher",
    component: AddPublisher, // trang hiển thị  
    beforeEnter: (to, from, next) => {
      // Kiểm tra xem người dùng đã đăng nhập thành công chưa
      const data = JSON.parse(localStorage.getItem("user"));
      if (data && data.user) {
        next();
      } else {
        next('/admin/dangnhap');
      }
    }, // trang hiển thị  
  },
  {
    path: "/addaccountbreach",
    name: "addaccountbreach",
    component: AddAccountBreach, // trang hiển thị
    beforeEnter: (to, from, next) => {
      // Kiểm tra xem người dùng đã đăng nhập thành công chưa
      const data = JSON.parse(localStorage.getItem("user"));
      if (data && data.user) {
        next();
      } else {
        next('/admin/dangnhap');
      }
    }, // trang hiển thị
  },
  {
    path: "/addgenre",
    name: "addgenre",
    component: AddGenre,
    beforeEnter: (to, from, next) => {
      // Kiểm tra xem người dùng đã đăng nhập thành công chưa
      const data = JSON.parse(localStorage.getItem("user"));
      if (data && data.user) {
        // Đã đăng nhập, chuyển hướng đến trang chính
        next();
      } else {
        // Chưa đăng nhập, cho phép truy cập trang đăng nhập
        next('/admin/dangnhap');
      }
    }, // trang hiển thị  
  },
  {
    path: "/addbook",
    name: "addbook",
    component: AddBook, // trang hiển thị
    beforeEnter: (to, from, next) => {
      // Kiểm tra xem người dùng đã đăng nhập thành công chưa
      const data = JSON.parse(localStorage.getItem("user"));
      if (data && data.user) {
        // Đã đăng nhập, chuyển hướng đến trang chính
        next();
      } else {
        // Chưa đăng nhập, cho phép truy cập trang đăng nhập
        next('/admin/dangnhap');
      }
    }, // trang hiển thị
  },
  {
    path: "/addreader",
    name: "addreader",
    component: AddReader, // trang hiển thị
    beforeEnter: (to, from, next) => {
      // Kiểm tra xem người dùng đã đăng nhập thành công chưa
      const data = JSON.parse(localStorage.getItem("user"));
      if (data && data.user) {
        next();
      } else {
        next('/admin/dangnhap');
      }
    }, // trang hiển thị  
  },
  {
    path: "/addauthor",
    name: "addauthor",
    component: AddAuthor, // trang hiển thị
    beforeEnter: (to, from, next) => {
      // Kiểm tra xem người dùng đã đăng nhập thành công chưa
      const data = JSON.parse(localStorage.getItem("user"));
      if (data && data.user) {
        next();
      } else {
        next('/admin/dangnhap');
      }
    }, // trang hiển thị
  },
  // nhân viên
  {
    path: "/danhsachnhanvien",
    name: "DanhSachNhanVien",
    component: DanhSachNhanVien,
    beforeEnter: (to, from, next) => {
      // Kiểm tra xem người dùng đã đăng nhập thành công chưa
      const data = JSON.parse(localStorage.getItem("user"));
      // const sessionAdmin = store.state.session_admin;
      if (data && data.user) {
        // Đã đăng nhập, chuyển hướng đến trang chính
        next();
      } else {
        // Chưa đăng nhập, cho phép truy cập trang đăng nhập
        next('/admin/dangnhap');
      }
    }, // trang hiển thị
  },
  {
    path: "/danhsachthethuvien",
    name: "DanhSachTheThuVien",
    component: DanhSachTheThuVien,
    beforeEnter: (to, from, next) => {
      // Kiểm tra xem người dùng đã đăng nhập thành công chưa
      const data = JSON.parse(localStorage.getItem("user"));
      // const sessionAdmin = store.state.session_admin;
      if (data && data.user) {
        // Đã đăng nhập, chuyển hướng đến trang chính
        next();
      } else {
        // Chưa đăng nhập, cho phép truy cập trang đăng nhập
        next('/admin/dangnhap');
      }
    }, // trang hiển thị
  },
  {
    path: "/danhsachdocgia",
    name: "DanhSachDocGia",
    component: DanhSachDocGia,
    beforeEnter: (to, from, next) => {
      // Kiểm tra xem người dùng đã đăng nhập thành công chưa
      const data = JSON.parse(localStorage.getItem("user"));
      // const sessionAdmin = store.state.session_admin;
      if (data && data.user) {
        // Đã đăng nhập, chuyển hướng đến trang chính
        next();
      } else {
        // Chưa đăng nhập, cho phép truy cập trang đăng nhập
        next('/admin/dangnhap');
      }
    }, // trang hiển thị
  },

  {
    path: "/danhsachnxbb",
    name: "DanhSachNXBb",
    component: DanhSachNXBb,
    beforeEnter: (to, from, next) => {
      // Kiểm tra xem người dùng đã đăng nhập thành công chưa
      const data = JSON.parse(localStorage.getItem("user"));
      // const sessionAdmin = store.state.session_admin;
      if (data && data.user) {
        // Đã đăng nhập, chuyển hướng đến trang chính
        next();
      } else {
        // Chưa đăng nhập, cho phép truy cập trang đăng nhập
        next('/admin/dangnhap');
      }
    }, // trang hiển thị
  },

  {
    path: "/danhsachchude",
    name: "DanhSachChuDe",
    component: DanhSachChuDe,
    beforeEnter: (to, from, next) => {
      // Kiểm tra xem người dùng đã đăng nhập thành công chưa
      const data = JSON.parse(localStorage.getItem("user"));
      // const sessionAdmin = store.state.session_admin;
      if (data && data.user) {
        // Đã đăng nhập, chuyển hướng đến trang chính
        next();
      } else {
        // Chưa đăng nhập, cho phép truy cập trang đăng nhập
        next('/admin/dangnhap');
      }
    }, // trang hiển thị
  },

  {
    path: "/danhsachtacgia",
    name: "DanhSachTacGia",
    component: DanhSachTacGia,
    beforeEnter: (to, from, next) => {
      // Kiểm tra xem người dùng đã đăng nhập thành công chưa
      const data = JSON.parse(localStorage.getItem("user"));
      if (data && data.user) {
        next();
      } else {
        // Chưa đăng nhập, cho phép truy cập trang đăng nhập
        next('/admin/dangnhap');
      }
    }, // trang hiển thị
  },

  {
    path: "/danhsachdocgiavipham",
    name: "DanhSachTaiKhoanViPham",
    component: DanhSachTaiKhoanViPham,
    beforeEnter: (to, from, next) => {
      // Kiểm tra xem người dùng đã đăng nhập thành công chưa
      const data = JSON.parse(localStorage.getItem("user"));
      if (data && data.user) {
        // Đã đăng nhập, chuyển hướng đến trang chính
        next();
      } else {
        // Chưa đăng nhập, cho phép truy cập trang đăng nhập
        next('/admin/dangnhap');
      }
    }, // trang hiển thị
  },

  {
    path: "/danhsachtaikhoan",
    name: "DanhSachTaiKhoan",
    component: DanhSachTaiKhoan,
    beforeEnter: (to, from, next) => {
      // Kiểm tra xem người dùng đã đăng nhập thành công chưa
      const data = JSON.parse(localStorage.getItem("user"));
      if (data && data.user) {
        // Đã đăng nhập, chuyển hướng đến trang chính
        next();
      } else {
        // Chưa đăng nhập, cho phép truy cập trang đăng nhập
        next('/admin/dangnhap');
      }
    }, // trang hiển thị
  },
  {
    path: "/danhsachtaikhoan",
    name: "DanhSachTaiKhoan",
    component: DanhSachTaiKhoan,
    beforeEnter: (to, from, next) => {
      // Kiểm tra xem người dùng đã đăng nhập thành công chưa
      const data = JSON.parse(localStorage.getItem("user"));
      if (data && data.user) {
        next();
      } else {
        next('/admin/dangnhap');
      }
    }, // trang hiển thị
  },
  {
    path: "/danhsachphieumuon",
    name: "DanhSachPhieuMuon",
    component: DanhSachPhieuMuon,
    beforeEnter: (to, from, next) => {
      // Kiểm tra xem người dùng đã đăng nhập thành công chưa
      const data = JSON.parse(localStorage.getItem("user"));
      if (data && data.user) {
        // Đã đăng nhập, chuyển hướng đến trang chính
        next();
      } else {
        // Chưa đăng nhập, cho phép truy cập trang đăng nhập
        next('/admin/dangnhap');
      }
    }, // trang hiển thị
  },

  // {
  //   path: "/ danhsachphieumuonchitiet",
  //   name: "DanhSachPhieuMuonChiTiet",
  //   component: DanhSachPhieuMuonChiTiet,
  //   beforeEnter: (to, from, next) => {
  //       // Kiểm tra xem người dùng đã đăng nhập thành công chưa
  //       const data = JSON.parse(localStorage.getItem("user"));
  //       if (data && data.user) {
  //         // Đã đăng nhập, chuyển hướng đến trang chính
  //         next();
  //       } else {
  //         // Chưa đăng nhập, cho phép truy cập trang đăng nhập
  //         next('/admin/dangnhap');
  //       }
  //     }, // trang hiển thị
  // },

  {
    path: "/editnhanvien/:id",
    name: "editnhanvien",
    component: EditNhanVien, // trang hiển thị
    beforeEnter: (to, from, next) => {
      // Kiểm tra xem người dùng đã đăng nhập thành công chưa
      const data = JSON.parse(localStorage.getItem("user"));
      if (data && data.user) {
        // Đã đăng nhập, chuyển hướng đến trang chính
        next();
      } else {
        // Chưa đăng nhập, cho phép truy cập trang đăng nhập
        next('/admin/dangnhap');
      }
    }, // trang hiển thị
  },
  {
    path: "/editthethuvien/:SoThe",
    name: "editthethuvien",
    component: EditTheThuVien, // trang hiển thị
    beforeEnter: (to, from, next) => {
      // Kiểm tra xem người dùng đã đăng nhập thành công chưa
      const data = JSON.parse(localStorage.getItem("user"));
      if (data && data.user) {
        next();
      } else {
        next('/admin/dangnhap');
      }
    }, // trang hiển thị
    props: true,
  },
  {
    path: "/editgenre/:ChuDeID",
    name: "editgenre",
    component: EditChuDe, // trang hiển thị
    beforeEnter: (to, from, next) => {
      // Kiểm tra xem người dùng đã đăng nhập thành công chưa
      const data = JSON.parse(localStorage.getItem("user"));
      if (data && data.user) {
        next();
      } else {
        next('/admin/dangnhap');
      }
    }, // trang hiển thị
  },
  {
    path: "/editdocgia/:id",
    name: "editdocgia",
    component: EditDocGia, // trang hiển thị
    beforeEnter: (to, from, next) => {
      // Kiểm tra xem người dùng đã đăng nhập thành công chưa
      const data = JSON.parse(localStorage.getItem("user"));
      if (data && data.user) {
        // Đã đăng nhập, chuyển hướng đến trang chính
        next();
      } else {
        // Chưa đăng nhập, cho phép truy cập trang đăng nhập
        next('/admin/dangnhap');
      }
    }, // trang hiển thị
  },
  {
    path: "/editaccountbreach/:id",
    name: "editaccountbreach",
    component: EditTaiKhoanViPham, // trang hiển thị
    beforeEnter: (to, from, next) => {
      // Kiểm tra xem người dùng đã đăng nhập thành công chưa
      const data = JSON.parse(localStorage.getItem("user"));
      if (data && data.user) {
        next();
      } else {
        next('/admin/dangnhap');
      }
    }, // trang hiển thị
  },
  {
    path: "/editphieumuon/:PhieuMuonID",
    name: "editphieumuon",
    component: EditPhieuMuon, // trang hiển thị
    beforeEnter: (to, from, next) => {
      // Kiểm tra xem người dùng đã đăng nhập thành công chưa
      const data = JSON.parse(localStorage.getItem("user"));
      if (data && data.user) {
        next();
      } else {
        next('/admin/dangnhap');
      }
    }, // trang hiển thị
  },

  {
    path: "/editnxb/:NXB_ID",
    name: "editnxb",
    component: EditNXB, // trang hiển thị
    beforeEnter: (to, from, next) => {
      // Kiểm tra xem người dùng đã đăng nhập thành công chưa
      const data = JSON.parse(localStorage.getItem("user"));
      if (data && data.user) {
        next();
      } else {
        next('/admin/dangnhap');
      }
    }, // trang hiển thị
  },
  {
    path: "/editgenre/:ChuDeID",
    name: "editgenre",
    component: EditChuDe, // trang hiển thị
    beforeEnter: (to, from, next) => {
      // Kiểm tra xem người dùng đã đăng nhập thành công chưa
      const data = JSON.parse(localStorage.getItem("user"));
      if (data && data.user) {
        next();
      } else {
        next('/admin/dangnhap');
      }
    }, // trang hiển thị
  },
  // {
  //   path: "/editnhanvien/:NhanVienID",
  //   name: "editnhanvien",
  //   component: EditNhanVien, // trang hiển thị
  //   beforeEnter: (to, from, next) => {
  //     // Kiểm tra xem người dùng đã đăng nhập thành công chưa
  //     const data = JSON.parse(localStorage.getItem("user"));
  //     if (data && data.user) {
  //       next();
  //     } else {
  //       next('/admin/dangnhap');
  //     }
  //   }, // trang hiển thị  
  // },
  {
    path: "/addnhanvien",
    name: "addnhanvien",
    component: AddNhanVien, // trang hiển thị
    beforeEnter: (to, from, next) => {
      // Kiểm tra xem người dùng đã đăng nhập thành công chưa
      const data = JSON.parse(localStorage.getItem("user"));
      if (data && data.user) {
        // Đã đăng nhập, chuyển hướng đến trang chính
        next();
      } else {
        // Chưa đăng nhập, cho phép truy cập trang đăng nhập
        next('/admin/dangnhap');
      }
    }, // trang hiển thị


  },
  // loại hàng
  {
    path: "/danhsachloaihang",
    name: "DanhSachLoaiHang",
    component: DanhSachLoaiHang, // trang hiển thị
    beforeEnter: (to, from, next) => {
      // Kiểm tra xem người dùng đã đăng nhập thành công chưa
      const data = JSON.parse(localStorage.getItem("user"));
      if (data && data.user) {
        // Đã đăng nhập, chuyển hướng đến trang chính
        next();
      } else {
        // Chưa đăng nhập, cho phép truy cập trang đăng nhập
        next('/admin/dangnhap');
      }
    }, // trang hiển thị
  },
  {
    path: "/addgenres",
    name: "addgenres",
    component: DanhSachLoaiHang, // trang hiển thị
    beforeEnter: (to, from, next) => {
      // Kiểm tra xem người dùng đã đăng nhập thành công chưa
      const data = JSON.parse(localStorage.getItem("user"));
      if (data && data.user) {
        // Đã đăng nhập, chuyển hướng đến trang chính
        next();
      } else {
        // Chưa đăng nhập, cho phép truy cập trang đăng nhập
        next('/admin/dangnhap');
      }
    }, // trang hiển thị
  },
  //
  {
    path: "/admin/dangnhap",
    name: "AminDangNhap",
    component: AdminDangNhap,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("@/views/NotFound.vue"),
  },

];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
export default router;