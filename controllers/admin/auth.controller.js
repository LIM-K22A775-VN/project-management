const md5 = require('md5');
const Account = require("../../models/account.model");
const systemConfig = require("../../config/system.js");
//[GET]  /admin/auth/login   
module.exports.login = (req, res) => {
    res.render("admin/pages/auth/login.pug", {
        pageTitle: "Trang đăng nhập"
    });
}
//[POST]  /admin/auth/login   
module.exports.loginPost = async (req, res) => {
    const email = req.body.email;
    const password = md5(req.body.password);
    const user = await Account.findOne({
        email: email,
        deleted: false
    });
    if (!user) {
        req.flash("error", "Email không tồn tại");
        return res.redirect("/admin/auth/login");
    }
    if (password != user.password) {
        req.flash("error", "Mật khẩu không chính xác");
        return res.redirect("/admin/auth/login");
    }
    if (user.status == "inactive"){
        req.flash("error", "Tài khoản đã bị khóa");
        return res.redirect("/admin/auth/login");
    }

    req.flash("success", "Đăng nhập thành công");

    res.cookie("token" , user.token); // "token" : tên biến là token
    res.redirect(`${systemConfig.prefixAdmin}/dashboard`);


}