const multer = require('multer');
const path = require('path');

const tempDir = path.join(__dirname, "../temp");

const multerConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, tempDir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: multerConfig
});

const newOfferUpload = upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "images", maxCount: 100 },
]);

module.exports = {
    upload,
    newOfferUpload
};