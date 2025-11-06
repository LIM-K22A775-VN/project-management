const SettingGeneral = require("../../models/settings-general.model");


//[GET] /admin/settings/general
module.exports.general = async (req, res) => {
    const permissions = res.locals.role.permissions; // bảo mật 
    if (permissions.includes("settings_view")) {
        // Tìm bản ghi duy nhất (chỉ có 1 cài đặt chung)
        let settingGeneral = await SettingGeneral.findOne({});
        res.render("admin/pages/settings/general", {
            pageTitle: "Cài đặt chung",
            settingGeneral : settingGeneral
        })
    }
}

module.exports.generalPatch = async (req, res) => {
    try {
        // Tìm bản ghi duy nhất (chỉ có 1 cài đặt chung)
        let settingGeneral = await SettingGeneral.findOne({});

        if (!settingGeneral) {
            // Nếu chưa có thì tạo mới
            settingGeneral = new SettingGeneral(req.body);
            await settingGeneral.save();
        } else {
            // Nếu đã có thì cập nhật
            await SettingGeneral.updateOne({}, req.body);
        }

        req.flash("success", "Cập nhật thành công");
        res.redirect(req.get("referer"));

    } catch (error) {
        console.error("❌ Lỗi cập nhật cài đặt:", error);
        req.flash("error", "Có lỗi xảy ra khi cập nhật!");
        res.redirect(req.get("referer"));
    }
};