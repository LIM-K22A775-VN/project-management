const md5 = require("md5");
const Account = require("../../models/account.model");
const systemConfig = require("../../config/system.js");
module.exports.index = async (req, res) => {
   res.render("admin/pages/my-account/index",{
    pageTitle :"Thông tin cá nhân"
   });
}
module.exports.edit = async (req, res) => {
   res.render("admin/pages/my-account/edit",{
    pageTitle :"Chỉnh sửa thông tin cá nhân"
   });
}
module.exports.editPatch = async (req, res) => {
   try {
        const emailExits = await Account.findOne({
            _id: {
                $ne: res.locals.user.id
            },
            email: req.body.email,
            deleted: false
        });
        if (emailExits) { // && (req.body.emailcu != req.body.email) 
            req.flash('error', `Email ${req.body.email} đã tồn tại!`);
            return res.redirect(`${systemConfig.prefixAdmin}/my-account/edit`);
        } else {
            if (req.body.password) {
                req.body.password = md5(req.body.password);
            } else {
                delete req.body.password;
            }
        }
        // delete req.body.emailcu;
        await Account.updateOne({
            _id: res.locals.user.id
        }, req.body)
        req.flash('success', 'Cập nhật tài khoản thành công');
        res.redirect(`${systemConfig.prefixAdmin}/my-account/edit`);
    } catch (error) {
        req.flash('error', 'Lỗi khi cập nhật tài khoản');
        res.redirect(`${systemConfig.prefixAdmin}/my-account/edit`);
    }
}