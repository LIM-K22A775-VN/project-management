const User = require("../../models/user.model");
const Cart = require("../../models/cart.model");
const ForgotPassword = require("../../models/forgot-password.model");
const md5 = require("md5");
const generateHelper = require("../../helpers/generate");
const sendMailHelper = require("../../helpers/sendMail");
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

    // console.log(req.cookies.cartId);
    // console.log(user.id);
    const expiresCookies = 1000 * 60 * 60 * 24;
    const cart = await Cart.findOne({
        user_id: user.id,
    });
    if (!cart) {
            await Cart.updateOne({
                _id: req.cookies.cartId,
            }, {
                user_id: user.id,
            });
    } else {
        res.cookie("cartId", cart.id, {
            expires: new Date(Date.now() + 365 * expiresCookies)
        });
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
    const email = req.body.email
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
    // console.log(`Gửi mã OPT qua mail:  ${otp}`);
    const subject = "Mã OTP xác minh lấy lại mật khẩu";
    const html = `
    Mã OTP để lấy lại mật khẩu là: <b>${otp}</b> Thời hạn sử dụng là 3 phút.
    `
    sendMailHelper.sendMail(email, subject, html);

    res.redirect(`/user/password/otp?email=${email}`);

};

//[GET] /user/password/otp
module.exports.optPassword = (req, res) => {
    const email = req.query.email;
    res.render("client/pages/user/otp-password", {
        pageTitle: "Nhập mã otp",
        email: email
    });
};
//[POST] /user/password/otp
module.exports.optPasswordPost = async (req, res) => {
    const email = req.body.email;
    const otp = req.body.otp;

    const result = await ForgotPassword.findOne({
        email: email,
        otp: otp,
    });

    if (!result) {
        req.flash("error", "OTP không hợp lệ");
        return res.redirect(req.get("Referer"));
    }

    // sau khi kiểm tran đúng OTP
    const user = await User.findOne({
        email: email
    });

    res.cookie("tokenUser", user.tokenUser);

    res.redirect("/user/password/reset");

};
module.exports.resetPassword = async (req, res) => {

    res.render("client/pages/user/reset-password", {
        pageTitle: "Đổi mật khẩu"
    });
};
module.exports.resetPasswordPost = async (req, res) => {

    const password = req.body.password;
    const tokenUser = req.cookies.tokenUser;

    await User.updateOne({
        tokenUser: tokenUser
    }, {
        password: md5(password),
    });

    req.flash("success", "Đổi mật khẩu");
    res.redirect("/");
};

//[GET] /user/infor
module.exports.infor = async (req, res) => {
    // console.log(res.locals.user); //res.locals.user = user; trả về cho view thì dùng luôn user
    res.render("client/pages/user/infor", {
        pageTitle: "Thông tin tài khoản",
    });
};