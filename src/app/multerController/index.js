const multer = require('multer');

// Cấu hình multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Đường dẫn để lưu trữ tệp tin
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop()); // Tên tệp tin được lưu trữ
  }
});
const upload = multer({ storage: storage });

module.exports = upload;