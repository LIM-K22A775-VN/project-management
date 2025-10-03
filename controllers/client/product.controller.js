module.exports.index = (req, res) => {
    res.render("client/pages/products/index.pug",{
        pageTitle : "Trang danh sach san pham"
    }
    );
}// tem ham la index
module.exports.create = (req, res) => {
    res.render("client/pages/products/index.pug");
}// tem ham la index
module.exports.edit = (req, res) => {
    res.render("client/pages/products/index.pug");
}// tem ham la edit