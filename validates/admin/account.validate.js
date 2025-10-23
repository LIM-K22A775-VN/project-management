const Account = require("../../models/account.model");

module.exports.creatPost = async (req, res, next) => {
    if (!req.body.fullName) {
        req.flash('error', `Vui lòng nhập họ tên!`);
        res.redirect(`/admin/accounts/create`);
        return;
    }
    if (!req.body.email) {
        req.flash('error', `Vui lòng nhập email!`);
        res.redirect(`/admin/accounts/create`);
        return;
    }
    if (!req.body.password) {
        req.flash('error', `Vui lòng nhập mật khẩu!`);
        res.redirect(`/admin/accounts/create`);
        return;
    }
    next();
}
module.exports.editPatch = async (req, res, next) => {
    if (!req.body.fullName) {
        req.flash('error', `Vui lòng nhập họ tên!`);
        res.redirect(`/admin/accounts/create`);
        return;
    }
    if (!req.body.email) {
        req.flash('error', `Vui lòng nhập email!`);
        res.redirect(`/admin/accounts/create`);
        return;
    }
    next();
}