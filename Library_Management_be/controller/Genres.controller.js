import { StatusCode } from "../utils/constants.js";
import { jsonGenerate } from "../utils/helpers.js";
import Genres from "../model/Genres.model.js";

// 1. Thêm thể loại mới
export const addGenre = async (req, res) => {
  const { TenChuDe } = req.body;

  try {
    // Kiểm tra nếu thể loại đã tồn tại
    // if (await Genres.checkGenreExists(genre_name)) {
    //   return res.json(
    //     jsonGenerate(StatusCode.BAD_REQUEST, "Thể loại này đã tồn tại")
    //   );
    // }

    // Thêm thể loại mới
    Genres.create(TenChuDe, (err, result) => {
      if (err) {
        return res.json(jsonGenerate(StatusCode.SERVER_ERROR, err.sqlMessage));
      }

      const status = result[1][0].status;
      const message = result[1][0].message;

      if (status === 1) {
        return res.json(jsonGenerate(StatusCode.BAD_REQUEST, message));
      }

      return res.json(jsonGenerate(StatusCode.CREATED, message));
    });
  } catch (error) {
    console.error(error);
    return res.json(jsonGenerate(StatusCode.SERVER_ERROR, "Lỗi hệ thống"));
  }
};

// 2. Lấy danh sách thể loại
export const getGenres = async (req, res) => {
  try {
    Genres.getAll((err, genres) => {
      if (err) {
        return res.json(jsonGenerate(StatusCode.SERVER_ERROR, err.sqlMessage));
      }
      return res.json(
        jsonGenerate(StatusCode.OK, "Lấy danh sách thể loại thành công", genres)
      );
    });
  } catch (error) {
    console.error(error);
    return res.json(jsonGenerate(StatusCode.SERVER_ERROR, "Lỗi hệ thống"));
  }
};

// 3. Lấy thông tin thể loại theo id
export const getGenreById = async (req, res) => {
  const { id } = req.params;

  try {
    Genres.getById(id, (err, genre) => {
      if (err) {
        return res.json(jsonGenerate(StatusCode.SERVER_ERROR, err.sqlMessage));
      }

      if (!genre || genre.length === 0) {
        return res.json(
          jsonGenerate(StatusCode.NOTFOUND, "Không tìm thấy chủ đề")
        );
      }

      return res.json(
        jsonGenerate(StatusCode.OK, "Lấy thông tin chủ đề thành công", genre[0])
      );
    });
  } catch (error) {
    console.error(error);
    return res.json(jsonGenerate(StatusCode.SERVER_ERROR, "Lỗi hệ thống"));
  }
};

// 4. Cập nhật thông tin thể loại
export const updateGenre = async (req, res) => {
  const { id } = req.params;
  const { TenChuDe } = req.body;

  try {
    // Kiểm tra nếu thể loại đã tồn tại
    if (await Genres.checkGenreExists(TenChuDe)) {
      return res.json(
        jsonGenerate(StatusCode.BAD_REQUEST, "Chủ đề này đã tồn tại")
      );
    }

    Genres.update(id, TenChuDe, (err, result) => {
      if (err) {
        return res.json(jsonGenerate(StatusCode.SERVER_ERROR, err.sqlMessage));
      }

      if (result.affectedRows === 0) {
        return res.json(
          jsonGenerate(StatusCode.NOTFOUND, "Không tìm thấy chủ đề")
        );
      }

      return res.json(
        jsonGenerate(StatusCode.OK, "Cập nhật thông tin chủ đề thành công")
      );
    });
  } catch (error) {
    console.error(error);
    return res.json(jsonGenerate(StatusCode.SERVER_ERROR, "Lỗi hệ thống"));
  }
};

// 5. Xóa thể loại
export const deleteGenre = async (req, res) => {
  const { id } = req.params;

  try {
    Genres.delete(id, (err, result) => {
      if (err) {
        return res.json(jsonGenerate(StatusCode.SERVER_ERROR, err.sqlMessage));
      }

      if (result.affectedRows === 0) {
        return res.json(
          jsonGenerate(StatusCode.NOTFOUND, "Không tìm thấy thể loại")
        );
      }

      return res.json(jsonGenerate(StatusCode.OK, "Xóa thể loại thành công"));
    });
  } catch (error) {
    console.error(error);
    return res.json(jsonGenerate(StatusCode.SERVER_ERROR, "Lỗi hệ thống"));
  }
};
