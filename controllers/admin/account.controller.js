const md5 = require('md5');
const Account = require("../../models/account.model");
const Role = require("../../models/role.model");
const systemConfig = require("../../config/system.js");

//[GET] /admin/account
module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    };

    const records = await Account.find(find).select("-password -token"); // khong gui password , token

    for (const record of records) {
        const role = await Role.findOne({
            _id: record.role_id,
            deleted: false,
        })
        record.role = role || {
            title: "Không có quyền"
        };
    }
    res.render("admin/pages/accounts/index", {
        pageTitle: "Danh sách tài khoản",
        records: records
    });

}
//[GET] /admin/account/create
module.exports.create = async (req, res) => {
    const roles = await Role.find({
        deleted: false
    });
    res.render("admin/pages/accounts/create", {
        pageTitle: "Tạo mới tài khoản",
        roles: roles
    });
}
//[POST] /admin/aaccount/create
module.exports.createPost = async (req, res) => {
    try {

        const emailExits = await Account.findOne({
            _id: {
                $ne: req.params.id
            },
            email: req.body.email,
            deleted: false
        });
        if (emailExits) {
            req.flash('error', `Email ${req.body.email} đã tồn tại!`);
            return res.redirect(`/admin/accounts/create`);
        }
        req.body.password = md5(req.body.password); // mã hóa
        const record = new Account(req.body);
        await record.save();
        req.flash('success', `Thêm tài khoản thành công`);
        res.redirect(`${systemConfig.prefixAdmin}/accounts`);
    } catch (error) {
        req.flash('error', 'Lỗi khi tạo tài khoản');
        res.redirect(`${systemConfig.prefixAdmin}/accounts`);
    }
}

module.exports.edit = async (req, res) => {
    try {
        const data = await Account.findOne({
            _id: req.params.id,
            deleted: false
        });
        const roles = await Role.find({
            deleted: false
        })
        res.render(`admin/pages/accounts/edit`, {
            pageTitle: "Chỉnh sửa tài khoản",
            data: data,
            roles: roles
        });
    } catch (error) {
        req.flash('error', 'id không được gửi lên');
        res.redirect(`${systemConfig.prefixAdmin}/accounts`);
    }
}

module.exports.editPatch = async (req, res) => {
    try {
        const emailExits = await Account.findOne({
            _id: {
                $ne: req.params.id
            },
            email: req.body.email,
            deleted: false
        });
        if (emailExits) { // && (req.body.emailcu != req.body.email) 
            req.flash('error', `Email ${req.body.email} đã tồn tại!`);
            return res.redirect(`${systemConfig.prefixAdmin}/accounts/edit/${req.params.id}`);
        } else {
            if (req.body.password) {
                req.body.password = md5(req.body.password);
            } else {
                delete req.body.password;
            }
        }
        // delete req.body.emailcu;
        await Account.updateOne({
            _id: req.params.id
        }, req.body)
        req.flash('success', 'Cập nhật tài khoản thành công');
        res.redirect(`${systemConfig.prefixAdmin}/accounts/edit/${req.params.id}`);
    } catch (error) {
        req.flash('error', 'Lỗi khi cập nhật tài khoản');
        res.redirect(`${systemConfig.prefixAdmin}/accounts/edit/${req.params.id}`);
    }
}

module.exports.detail = async (req, res) => {
    try {
        const data = await Account.findOne({
            _id: req.params.id,
            deleted: false
        }).select("-password");
        const roles = await Role.find({
            _id: data.role_id,
            deleted: false
        })
        console.log(data);
        console.log(roles);
        res.render(`admin/pages/accounts/detail`, {
            pageTitle: "Chi tiết tài khoản",
            data: data,
            roles: roles
        });
    } catch (error) {
        req.flash('error', 'id không được gửi lên');
        res.redirect(`${systemConfig.prefixAdmin}/accounts`);
    }
}