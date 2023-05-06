const express = require('express');
const router = express.Router();
const { offert } = require('../controllers');
const {newOfferUpload} = require('../middlewares/multer');

router.get("", offert.getOfferts);

router.post("", newOfferUpload, offert.newOffert);

module.exports = router;