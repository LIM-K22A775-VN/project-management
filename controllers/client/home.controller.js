const ProductCategory = require("../../models/product-category.model");
const createTreeHelper = require("../../helpers/createTree.js")
// [GET] /client/
module.exports.index = async (req, res) => {
    res.render("client/pages/home/index.pug", {
        pageTitle: "Trang chủ",      
    });
} // tem ham la index
module.exports.create = (req, res) => {
    res.render("client/pages/home/index.pug");
} // tem ham la index
module.exports.edit = (req, res) => {
    res.render("client/pages/home/index.pug");
} // tem ham la edit