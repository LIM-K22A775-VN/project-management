const ProductCategory = require("../../models/product-category.model");
const systemConfig = require("../../config/system");
//[GET] /admin/products-category
module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    }
    const records = await ProductCategory.find(find)
    res.render("admin/pages/products-category/index.pug", {
        pageTitle: "Danh mục sản phẩm",
        records : records
    });
} 
//[GET] /admin/products-category/create
module.exports.create = async (req, res) => {
    res.render("admin/pages/products-category/create.pug", {
        pageTitle: "Tạo danh mục sản phẩm",
    });
} 

// [POST] /admin/products-category/create
module.exports.creatPost = async (req, res) => {
    if (req.body.position) {
        req.body.position = parseFloat(req.body.position);
    } else { 
        const count = await ProductCategory.countDocuments();
        req.body.position = count + 1;
    }
    const record = new ProductCategory(req.body); // record : bản ghi
    await record.save();
    req.flash('success', `Thêm danh mục thành công`);
    res.redirect(`${systemConfig.prefixAdmin}/products-category`);
  
}   