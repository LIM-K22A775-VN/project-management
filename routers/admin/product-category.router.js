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


router.patch('/change-status/:status/:id', controller.changeStatus);

//Chi tiet
router.get('/detail/:id', controller.detail);
//chi tiet


// Chỉnh sửa
router.get('/edit/:id', controller.edit);
router.patch(
    '/edit/:id',
    upload.single("thumbnail"),
    uploadCloud.upload,
    productValidate.creatPost, // điều kiện của các biến 
    controller.editPatch
);
//Xóa sản phẩm
router.delete('/delete/:id', controller.deleteItem);

//thay đổi trạng thái nhiều sản phẩm 
router.patch('/change-multi/', controller.changeMulti);


module.exports = router;