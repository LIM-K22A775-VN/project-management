const express = require('express');

const multer = require('multer') // dùng để upload ảnh
const productValidate = require("../../validates/admin/product.validate.js")

// const upload = multer({ dest: './public/uploads' }) //dest : duong dan luu img
const storageMulter = require("../../helpers/storageMulter"); // biến tên và đường dẫn ảnh upload từ file
const upload = multer({ storage: storageMulter(multer) }) 

const router = express.Router();

const controller = require("../../controllers/admin/product.controller");

router.get('/', controller.index );

router.patch('/change-status/:status/:id', controller.changeStatus); // thay đổi trạng thái 1 sp
// :status là kiểu động , người dùng truyền vào ntn thì nó như vậy 

router.patch('/change-multi/', controller.changeMulti);

router.delete('/delete/:id', controller.deleteItem);
router.get('/thungrac', controller.thungrac);


router.get('/create', controller.create);

// name="thumbnail" → phải trùng với upload.single("thumbnail").
router.post(
    '/create',
    upload.single("thumbnail"), 

    productValidate.creatPost, // điều kiện của các biến 

    controller.createPost
);

router.get('/edit', controller.edit);

module.exports = router;