const express = require('express');

const router = express.Router();

const controller = require("../../controllers/admin/product.controller");

router.get('/', controller.index );

router.patch('/change-status/:status/:id', controller.changeStatus); // thay đổi trạng thái 1 sp
// :status là kiểu động , người dùng truyền vào ntn thì nó như vậy 

router.patch('/change-multi/', controller.changeMulti);

router.delete('/delete/:id', controller.deleteItem);
router.get('/thungrac', controller.thungrac);


router.get('/create', controller.create);
router.post('/create', controller.createPost);

router.get('/edit', controller.edit);

module.exports = router;