const User = require("../../models/user.model");
const ForgotPassword = require("../../models/forgot-password.model");
const md5 = require("md5");
const generateHelper = require("../../helpers/generate");
module.exports.register = (req, res) => {
    res.render("client/pages/user/register", {
        pageTitle: "Đăng ký tài khoản"
    });
};
module.exports.registerPost = async (req, res) => {

    const existEmail = await User.findOne({
        email: req.body.email
    });


    if (existEmail) {
        req.flash("error", "Email đã tồn tại");
        res.redirect("/user/register");
        return;
    }
    req.body.password = md5(req.body.password);
    const user = new User(req.body);
    await user.save();
    req.flash("success", "Đăng ký thành công");

    // cho đăng nhập luôn
    res.cookie("tokenUser", user.tokenUser)

    res.redirect("/");
};

module.exports.login = (req, res) => {

    res.render("client/pages/user/login", {
        pageTitle: "Đăng nhập tài khoản"
    });
};
module.exports.loginPost = async (req, res) => {
    const user = await User.findOne({
        email: req.body.email,
        //   password : md5(req.body.password),  
        deleted: false
    });

    if (!user) {
        req.flash("error", "Email không tồn tại");
        res.redirect("/user/login");
        return;
    }
    if (!(md5(req.body.password) === user.password)) {
        req.flash("error", "Mật khẩu không đúng");
        res.redirect("/user/login");
        return;
    }

    if (user.status === "inactive") {
        req.flash("error", "Tài khoản đang bị khóa");
        res.redirect("/user/login");
        return;
    }

    res.cookie("tokenUser", user.tokenUser);
    req.flash("success", "Đăng nhập thành công");
    res.redirect("/");
};


module.exports.logout = (req, res) => {
    res.clearCookie("tokenUser");
    res.redirect("/");
};
module.exports.forgotPassword = (req, res) => {
    res.render("client/pages/user/forgot-password", {
        pageTitle: "Lấy lại mật khẩu"
    });
};
module.exports.forgotPasswordPost = async (req, res) => {
    const email =  req.body.email
    const user = await User.findOne({
        email: email,
    });

    if (!user) {
        req.flash("error", "Email không tồn tại");
        res.redirect(req.get("Referer"));
        return;
    }


    //nếu tồn tại email Lưu thông tin vào Db
    const otp = generateHelper.generateRandomrateRandomNumber(8);
    const objectForgetPassword = {
        email: email,
        otp: otp,
        exprireAt: Date.now()
    }
    // lưu vào db
    const forgorPasswordPost = new ForgotPassword(objectForgetPassword);
    await forgorPasswordPost.save();

    // nếu tồn tại email thì gửi mã OTP

    res.send("ok");
};