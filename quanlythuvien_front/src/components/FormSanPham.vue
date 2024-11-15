<template>
    <div class="container-xl formthem">
        <Form
            @submit="submitHangHoa"
            :validation-schema="HangHoaFormSchema"  
        >
        <div class="row">
            <div class="col-md-6 col-xl-6">
                <div class="form-group col-6 offset-4">
                    <label for="name">Tên sách</label>
                    <Field
                        name="name"
                        type="text"
                        class="form-control"
                        v-model="this.HangHoaLocal.tensach"
                    />
                    <ErrorMessage name="name" class="error-feedback" />
                </div>
                <div class="form-group col-6 offset-4">
                    <label for="sotrang">Số trang</label>
                    <Field
                        name="sotrang"
                        type="text"
                        as="textarea"
                        class="form-control"
                        maxlength="100"
                        v-model="this.HangHoaLocal.sotrang"
                    />
                    <ErrorMessage name="mota" class="error-feedback" />
                </div>
                <div class="form-group col-6 offset-4">
                    <label for="soluong">Số lượng</label>
                    <Field
                        name="soluong"
                        type="text"
                        class="form-control"
                        v-model="this.HangHoaLocal.soluong"
                    />
                    <ErrorMessage name="thuonghieu" class="error-feedback" />
                </div>
                <div class="form-group col-6 offset-4">
                    <label for="mota">Mô tả</label>
                    <select
                        name="mota"
                        class="form-select"
                        v-model="this.HangHoaLocal.mota"  
                    >
                        <option v-if="this.HangHoaLocal.idloai!=''" selected >{{this.HangHoaLocal.tenloai}}</option>
                        <option v-for="loai in loaihang" :value="loai._id" >{{loai.tenloai}}</option>
                        <!-- Thêm các loại hàng khác nếu cần -->
                    </select>
                    <ErrorMessage name="loaiHangHoa" class="error-feedback" />
                </div>
            </div>
        <div class="col-md-6 col-xl-6">
            <div class="form-group col-6">
                <label for="tacgia">Tên tác giả</label>
                <Field
                    name="tacgia"
                    type="text"
                    class="form-control"
                    v-model="this.HangHoaLocal.tacgia"
                />
                <ErrorMessage name="gia" class="error-feedback" />
            </div>
            <div class="form-group col-6">
                <label for="nxb">Nhà xuất bản</label>
                <Fieldượng
                    name="nxb"
                    type="text"
                    class="form-control"
                    v-model="this.HangHoaLocal.nxb"
                />
                <ErrorMessage name="gia" class="error-feedback" />
            </div>
            <div class="form-group col-4">
                <label for="namxuatban">Năm xuất bản</label>
                <Field
                    name="namxuatban"
                    type="date"
                    class="form-control"
                    v-model="this.HangHoaLocal.namxuatban"
                />
                <ErrorMessage name="ngaysanxuat" class="error-feedback" />
            </div>
        </div>
    </div>

    
    <div class="row mt-2 mb-5">
        <div class="form-group col-6 offset-6">
            <button class="btn btn-primary m-2">Lưu</button>   
            <button v-if="mode=='edit'"   type="button" class="m-2 btn btn-danger" @click="deleteHangHoa">Xóa</button> </div>
        </div> 
            
    </Form>
</div>
    
</template>

<script>

import * as yup from "yup"; // thư viện xác thực kiểm tra tính hợp lệ
import { Form, Field, ErrorMessage } from "vee-validate"; // thư viện xây dựng các Form thực hiện xác thực dữ liệu
        //Form: tạo Form chứa các trường nhập liệu, quản lý trạng thái,sự kiện gửi.
        //Field: tạo các trường nhập liệu trong trong Form
        //ErrorMessage: hiển thị thông báo lỗi nếu việc kiểm tra tính hợp lệ thất bại.
// import loaihangService from "@/services/loaihang.service";

    export default {
        components: {
            Form,
            Field,
            ErrorMessage,
        },
        emits: ["submit:hanghoa", "delete:hanghoa"],
        props: {
            hanghoa: { type: Object, default: null }, // dữ lieu HangHoa nhận từ HangHoaadd, HangHoaedit
            mode: { type: String, default: "create" },// dữ lieu HangHoa nhận từ HangHoaadd, HangHoaedit
            
        },
        data() {
            const HangHoaFormSchema = yup.object().shape({  // tạp 1 schema để kiểm tra dữ liệu
                // định nghĩa các ràng buộc dữ liệu nhập vào
                name: yup.string().required("Tên phải có giá trị.").min(2, "Tên phải ít nhất 2 ký tự."),
                thuonghieu: yup.string().required("Thương hiệu phải có giá trị."),
                hansudung: yup.string()
            .required("Hạn sử dụng không được bỏ trống.")
            .test('date-order', 'Thời hạn bảo hành phải sau ngày sản xuất', function (value) {
                const ngaySanXuat = this.parent.ngaysanxuat;
                if (!ngaySanXuat || !value) {
                    return true; // Nếu một trong hai không có giá trị, thì coi như là hợp lệ
                }
                // hạn sử dụng > ngày sản xuất true cho qua
                return new Date(value) > new Date(ngaySanXuat);  }),

                ngaysanxuat: yup.string().required("Ngày sản xuất không được bỏ trống.")
                    .test('not-in-future', 'Ngày sản xuất không được vượt quá ngày hiện tại', function (value) {
                        const currentDate = new Date();
                        const selectedDate = new Date(value); // ngày sản xuất
                        // ngày sản xuất <= ngày hiện tại true thì cho qua
                        return selectedDate <= currentDate;
                    }),
                //
            
                //
				
                gia: yup.string().required("Nhập giá bán").test("is-number", "Số lượng phải là số", (value) => !isNaN(value)),
				
				soluong: yup.string().required("Nhập số lượng hàng").test("is-number", "Số lượng phải là số", (value) => !isNaN(value)),
            });
            return {
                HangHoaLocal: this.hanghoa || { tenhh:'', soluong: '', gia: '', mota: '', tenloai:'', idloai:'', thuonghieu:'', ngaysanxuat:'', hansudung:'', linkanh:'' },
                HangHoaFormSchema,
                loaihang: [],
            };
        },
        methods: {
            async getALLLoaiHang() {
   
                try {
                    // lấy danh sách các loại hàng
                    this.loaihang = await loaihangService.getAll();
                   
                    if(this.HangHoaLocal.idloai!='' && this.HangHoaLocal.idloai!=null){
                        const loai = await loaihangService.getById(this.HangHoaLocal.idloai);
                        this.HangHoaLocal.tenloai = loai.tenloai;
                    }
                } catch (error) {
                    console.log(error);
                }
                },
            submitHangHoa() {
                    this.$emit("submit:hanghoa", this.HangHoaLocal, this.HangHoaLocal.linkanh);  // sự kiện submit  
            },
            deleteHangHoa() {
                this.$emit("delete:hanghoa", this.HangHoaLocal.id);  // sự kiện delete
            },
        },
    created(){
            this.getALLLoaiHang(); // gọi khi trang vừa được load
            if(this.hanghoa){
            this.HangHoaLocal = this.hanghoa;

        }
       
        
            }
      
        
    };
</script>
<style scoped>
label {
    margin-top: 1rem;
    margin-bottom: 1rem;;
    font-weight: 500;
}
.formthem{
    margin-left: 14rem;
    margin-right: 10rem;
}

.error-feedback {
    color: red;
}
</style>