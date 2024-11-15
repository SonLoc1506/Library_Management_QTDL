import { StatusCode } from "../utils/constants.js";
import { jsonGenerate } from "../utils/helpers.js";
import ThongKe from "../model/ThongKe.model.js";

export const getThongKeMuonSach = async (req, res) => {

    ThongKe.getThongKeMuonSach((err, result) => {
        if (err) return res.json(jsonGenerate(StatusCode.INTERNAL_SERVER_ERROR, err));
        res.json(jsonGenerate(StatusCode.OK, "Thành công", result[1]));
    });
};
