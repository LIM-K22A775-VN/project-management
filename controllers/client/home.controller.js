const Product = require("../../models/product.model");
const productHeplers = require("../../helpers/product");
// [GET] /client/
module.exports.index = async (req, res) => {
    // lấy ra sản phẩm nổi bật
    const productsFeatured = await Product.find({
        featured: "1",
        deleted: false,
        status: "active"
    }).limit(2);
    const newProduct = productHeplers.priceNewProducts(productsFeatured);
    res.render("client/pages/home/index.pug", {
        pageTitle: "Trang chủ",
        productsFeatured : newProduct      
    });
} // tem ham la index
module.exports.create = (req, res) => {
    res.render("client/pages/home/index.pug");
} // tem ham la index
module.exports.edit = (req, res) => {
    res.render("client/pages/home/index.pug");
} // tem ham la edit