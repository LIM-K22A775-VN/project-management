const Product = require("../../models/product.model.js");

// [GET]  /products 
module.exports.index = async (req, res) => {
    const products = await Product.find({
        status: "active", // tim nhung thang dang hoat dong
        deleted: false // tim nhung thang chua XOA
    }).sort({
        position: "desc"
    }) // asc : tăng dần , desc : giảm dần;

    const newProduct = products.map((item) => {
        item.priceNew = (item.price * (1 - item.discountPercentage / 100)).toFixed(2);
        return item;
    });

    res.render("client/pages/products/index.pug", {
        pageTitle: "Trang danh sach san pham",
        products: newProduct
    });
} // tem ham la index
//[GET] /product/:slug
module.exports.detail = async (req, res) => {
    try {
        const find = {
            deleted :false,
            slug : req.params.slug,
            status :"active"
        }
        const product = await Product.findOne(find);
        res.render("client/pages/products/detail.pug", {
            pageTitle: "Trang chi tiết sản phẩm",
            product: product
            // products: newProduct
        });
    } catch (error) {
        res.redirect(`/products`);
    }
} // tem ham la index
module.exports.create = (req, res) => {
    res.render("client/pages/products/index.pug");
} // tem ham la index
module.exports.edit = (req, res) => {
    res.render("client/pages/products/index.pug");
} // tem ham la edit