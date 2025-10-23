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

        const emailExist = await Account.findOne({
            email:req.body.email,
            deleted: false
        });
        if(emailExist){
            req.flash('error', `Email ${req.body.email} đã tồn tại!`);
            res.redirect(`/admin/accounts/create`);
            return;
        }
    next();
}