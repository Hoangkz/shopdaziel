const multer = require('multer');
const moment = require('moment');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/public/uploads/');
  },
  filename: function (req, file, cb) {
    const originalName = file.originalname;
    const timestamp = moment().format('YYYYMMDD-HHmmss');
    const extension = originalName.substring(originalName.lastIndexOf('.') + 1);
    const filename = originalName.replace(`.${extension}`, `-${timestamp}.${extension}`).replace(/ /g, "_");
    cb(null, filename);
  }
});

const fileFilter = function (req, file, cb) {
  // Kiểm tra kiểu tệp tin ảnh
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;
