const Product = require("../../models/product.model");
const productHeplers = require("../../helpers/product");
// [GET] /client/
module.exports.index = async (req, res) => {
    // lấy ra sản phẩm nổi bật
    const productsFeatured = await Product.find({
        featured: "1",
        deleted: false,
        status: "active"
    }).limit(6);
    const newProductsFeatured = productHeplers.priceNewProducts(productsFeatured);
    // Hết lấy ra sản phẩm nổi bật
    const productsNew = await Product.find({

        deleted: false,
        status: "active"
    }).sort({position : "desc"}).limit(6);
    const newProductNew = productHeplers.priceNewProducts(productsNew);
     // lấy ra sản phẩm mới nhất

    res.render("client/pages/home/index.pug", {
        pageTitle: "Trang chủ",
        productsFeatured : newProductsFeatured ,
        productsNew :  newProductNew   
    });
} // tem ham la index
module.exports.create = (req, res) => {
    res.render("client/pages/home/index.pug");
} // tem ham la index
module.exports.edit = (req, res) => {
    res.render("client/pages/home/index.pug");
} // tem ham la edit