const Role = require("../../models/role.model");
const systemConfig = require("../../config/system.js")
//[GET] /admin/roles
module.exports.index = async (req, res)=>{
    let find = {
        deleted : false,            
    };

    const records = await Role.find(find);
    res.render("admin/pages/roles/index",{
        pageTitle: "Nhóm quyền",
        records : records
    });
}
//[GET] /admin/roles/create
module.exports.create = async (req, res)=>{

    res.render("admin/pages/roles/create",{
        pageTitle: "Tạo nhóm quyền",
    });
}
//[POST] /admin/roles/create
module.exports.createPost = async (req, res)=>{
    const record = new Role(req.body);
    await record.save();
    req.flash('success', `Thêm danh mục thành công`);
    res.redirect(`${systemConfig.prefixAdmin}/roles`);
}

//[GET] /admin/roles/edit
module.exports.edit = async (req, res)=>{
    let find ={
        _id : req.params.id,
        deleted:false
    }
    const record = await Role.findOne(find);
    res.render("admin/pages/roles/edit",{
        pageTitle: "Sửa nhóm quyền",
        record : record
    });
}
//[PATCH] /admin/roles/edit
module.exports.editPatch = async (req, res)=>{
    try {
        const id = req.params.id;
        await Role.updateOne({
            _id: id
        }, req.body);

        req.flash('success', 'Cập nhật nhóm quyền thành công');
        res.redirect(`${systemConfig.prefixAdmin}/roles`);
    } catch (err) {
        console.error('Lỗi khi cập nhật nhóm quyền', err);
        req.flash('error', 'Có lỗi xảy ra khi cập nhật nhóm quyền');
        res.redirect(`${systemConfig.prefixAdmin}/roles`);
    }
}