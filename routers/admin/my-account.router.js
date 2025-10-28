const express = require('express');
const router = express.Router();

const controller = require("../../controllers/admin/my-account.controller");

const multer = require('multer') // dùng để upload ảnh
const upload = multer()
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware.js")

router.get('/', controller.index);
router.get('/edit', controller.edit);
router.patch('/edit',
    upload.single("avatar"),
    uploadCloud.upload,
    controller.editPatch);

module.exports = router;