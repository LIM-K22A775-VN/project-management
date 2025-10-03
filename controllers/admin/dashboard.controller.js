// [GET] /admin/dashboard
module.exports.dashboard = (req, res) => {
    res.render("admin/pages/dashboard/index.pug" , {
        pageTitle : "Trang tong quan"
    });
}

module.exports.create = (req, res) => {
    res.render("admin/pages/dashboard/index.pug");
}// tem ham la index
module.exports.edit = (req, res) => {
    res.render("admin/pages/dashboard/index.pug");
}// tem ham la edit