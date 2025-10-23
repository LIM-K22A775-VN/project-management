const md5 = require('md5');
const Account = require("../../models/account.model");
const Role = require("../../models/role.model");
const systemConfig = require("../../config/system.js");

//[GET] /admin/account
module.exports.index = async (req, res) => {
     let find ={
        deleted : false
    };

    const records = await Account.find(find).select("-password -token"); // khong gui password , token

    for (const record of records) {
        const role = await Role.findOne({
            _id : record.role_id,
            deleted : false,          
        })
        record.role = role || { title: "Không có quyền" };
    }
    res.render("admin/pages/accounts/index", {
        pageTitle: "Danh sách tài khoản",
        records: records
    });

}
//[GET] /admin/aaccount/create
module.exports.create = async (req, res) => {
    const roles = await Role.find({deleted:false});
    res.render("admin/pages/accounts/create", {
        pageTitle: "Tạo mới tài khoản",
        roles:roles
    });
}
//[POST] /admin/aaccount/create
module.exports.createPost = async (req, res) => {
      
    req.body.password = md5(req.body.password);  // mã hóa
    const record = new Account(req.body);
    await record.save();
    req.flash('success', `Thêm tài khoản thành công`);
    res.redirect(`${systemConfig.prefixAdmin}/accounts`);
}