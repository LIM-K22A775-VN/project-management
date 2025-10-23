const express = require('express');


const controller = require("../../controllers/admin/account.controller");

const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware.js")
const multer = require('multer') // dùng để upload ảnh
const router = express.Router();
const upload = multer()
const accountValidate = require("../../validates/admin/account.validate.js")
router.get('/', controller.index);


router.get('/create', controller.create);
router.post('/create',
    upload.single("avatar"),
    uploadCloud.upload,
    accountValidate.creatPost, // điều kiện của các biến 
    controller.createPost);

router.get('/edit/:id',
    controller.edit);
router.patch('/edit/:id',
    upload.single("avatar"),
    uploadCloud.upload,
    accountValidate.editPatch,
    controller.editPatch);


module.exports = router;