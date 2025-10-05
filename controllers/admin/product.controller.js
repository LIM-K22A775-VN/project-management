const Product = require("../../models/product.model")


// [GET] /admin/products
module.exports.index = async (req, res) => {
    const products = await Product.find({
        deleted: false
    });
    res.render("admin/pages/products/index.pug" , {      
        pageTitle : "Danh sách sản phẩm",
        products: products
    });
}// tem ham la index
module.exports.create = (req, res) => {
    res.render("admin/pages/products/index.pug");
}// tem ham la index
module.exports.edit = (req, res) => {
    res.render("admin/pages/products/index.pug");
}// tem ham la edit