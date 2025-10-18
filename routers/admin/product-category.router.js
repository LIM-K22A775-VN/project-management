const express = require('express');

const controller = require("../../controllers/admin/product-category.controller");
const productValidate = require("../../validates/admin/product-category.validate.js") 
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware.js")
const router = express.Router();
const multer = require('multer') // dùng để upload ảnh
const upload = multer()
router.get('/', controller.index);
router.get('/create', controller.create);
router.post(
    '/create',
    upload.single("thumbnail"),
    uploadCloud.upload
    ,
    productValidate.creatPost, // điều kiện của các biến 
    controller.creatPost
);

module.exports = router;