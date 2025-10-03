// [GET] /admin/products
module.exports.index = (req, res) => {
    res.render("admin/pages/products/index.pug" , {
        pageTitle : "Danh sách sản phẩm"
    });
}// tem ham la index
module.exports.create = (req, res) => {
    res.render("admin/pages/products/index.pug");
}// tem ham la index
module.exports.edit = (req, res) => {
    res.render("admin/pages/products/index.pug");
}// tem ham la edit