const express = require("express");
const router = express.Router();
const controller = require("../../controllers/client/user.controller");
const userValidate = require("../../validates/client/user.validate");
router.get("/register" ,controller.register);
router.post("/register" ,
    userValidate.registerPost,
    controller.registerPost);

router.get("/login" ,controller.login);
router.post("/login" ,
    userValidate.loginPost,
    controller.loginPost);

router.get("/logout" ,controller.logout);


router.get("/password/forgot" ,controller.forgotPassword);
router.post("/password/forgot" ,
    userValidate.forgorPasswordPost,
    controller.forgotPasswordPost);

router.get("/password/otp" ,controller.optPassword);
router.post("/password/otp" ,controller.optPasswordPost);

router.get("/password/reset" ,controller.resetPassword);
router.post("/password/reset" ,
    userValidate.resetPasswordPost,
    controller.resetPasswordPost);


module.exports = router;