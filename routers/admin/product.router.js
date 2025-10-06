const express = require('express');

const router = express.Router();

const controller = require("../../controllers/admin/product.controller");

router.get('/', controller.index );
router.patch('/change-status/:status/:id', controller.changeStatus); // thay đổi trạng thái
// :status là kiểu động , người dùng truyền vào ntn thì nó như vậy 

router.get('/create', controller.create);
router.get('/edit', controller.edit);

module.exports = router;