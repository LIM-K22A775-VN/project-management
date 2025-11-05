const express = require('express');

const router = express.Router();

const controller = require("../../controllers/client/cart.controller");

const cartMiddleware = require("../../middlewares/client/cart.middleware");

router.get("/" ,
     controller.index);

router.post('/add/:productId', controller.addPost );

router.get('/delete/:productId', controller.deleteGet );

router.get('/update/:productId/:quantity', controller.update );


module.exports = router;