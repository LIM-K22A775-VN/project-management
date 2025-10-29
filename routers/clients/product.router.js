const express = require('express');

const router = express.Router();

const controller = require("../../controllers/client/product.controller");
router.get('/',controller.index );
router.get('/create',controller.create);
router.get('/edit',controller.edit);


router.get('/detail/:slugProduct',controller.detail);


router.get('/:slugCategory',controller.category);

module.exports = router;