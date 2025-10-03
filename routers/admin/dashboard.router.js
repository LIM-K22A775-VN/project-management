const express = require('express');

const router = express.Router();

const controller = require("../../controllers/admin/dashboard.controller");

router.get('/', controller.dashboard );
router.get('/create', controller.create);
router.get('/edit', controller.edit);

module.exports = router;