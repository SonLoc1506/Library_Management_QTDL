<template>
    <div>
        <AppHeaderAdmin :session_admin="session_admin" />
        <main class="main-admin">

            <div class="row">
                <div class="col-10 mt-3 offset-1">
                    <div class="shadow p-3 rounded bg-body">
                        <div class="col-md-12 text-primary">
                            <h5>
                                <span><i class="fa-solid fa-users"></i></span> Thống kê
                            </h5>
                            <hr />
                        </div>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Số lần mượn</th>
                                    <th>Số sách mượn</th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(thongke, index) in filteredAccounts" :key="index">
                                    <td>{{ thongke.SoLanMuon }}</td>
                                    <td>{{ thongke.SoCuonSachMuon }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="row mb-3 thanhbutton">
                        <button class="btn btn-sm btn-primary col-2 m-3" @click="refreshList">
                            <i class="fas fa-redo"></i> Làm mới
                        </button>

                    </div>
                </div>
            </div>
        </main>
        <AppFooterAdmin />
    </div>
</template>

<script>
import AppHeaderAdmin from "@/components/AppHeaderAdmin.vue";
import AppFooterAdmin from "@/components/AppFooterAdmin.vue";
import InputSearchAdmin from "@/components/InputSearchAdmin.vue";
import ThongKe from "@/services/ThongKe.service";

export default {
    components: {
        AppHeaderAdmin,
        AppFooterAdmin,
        InputSearchAdmin,
    },
    data() {
        return {
            thongke: [],
            searchText: "",
            session_admin: null
        };
    },
    computed: {
        filteredAccounts() {
            if (!this.searchText) return this.thongke;
        },
    },
    methods: {
        async refreshList() {
            try {
                // mặc định là 6 tháng
                const response = await ThongKe.get({ so_thang: 6 });
                this.thongke = response.data;
            } catch (error) {
                console.error("Error fetching accounts:", error);
            }
        },
    },
    mounted() {
        this.refreshList();
    },
};
</script>