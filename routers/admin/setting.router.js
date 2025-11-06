const express = require('express');
const router = express.Router();

const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware.js")
const multer = require('multer') // dùng để upload ảnh
const upload = multer()
const controller = require("../../controllers/admin/setting.controller");

router.get('/general', controller.general);
router.patch('/general', 
    upload.single("logo"),
    uploadCloud.upload,
    controller.generalPatch);



module.exports = router;