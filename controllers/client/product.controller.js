const Product = require("../../models/product.model.js");
const ProductCategory = require("../../models/product-category.model");
const prodcutCategoryHelper = require("../../helpers/product-category.js")
const productHeplers = require("../../helpers/product");
// [GET]  /products 
module.exports.index = async (req, res) => {
    const products = await Product.find({
        status: "active", // tim nhung thang dang hoat dong
        deleted: false // tim nhung thang chua XOA
    }).sort({
        position: "desc"
    }) // asc : tăng dần , desc : giảm dần;

    const newProduct = productHeplers.priceNewProducts(products);

    res.render("client/pages/products/index.pug", {
        pageTitle: "Trang danh sach san pham",
        products: newProduct
    });
} // tem ham la index
//[GET] /product/:slugProduct   
module.exports.detail = async (req, res) => {
    try {
        const find = {
            deleted: false,
            slug: req.params.slugProduct,
            status: "active"
        }
        const product = await Product.findOne(find);

        if(product.parent_category_id){
            const category = await ProductCategory.findOne({
                _id : product.parent_category_id,
                status : "active",
                deleted : false
            });
            product.category = category;
        }

        product.priceNew = productHeplers.priceNewProduct(product); // lấy ra giá mới

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
//[GET] /products/:slugCategory
module.exports.category = async (req, res) => {
    const category = await ProductCategory.findOne({
        deleted: false,
        status: "active",
        slug: req.params.slugCategory
    });
    
    
    const listSubCategory = await prodcutCategoryHelper.getSubCategory(category.id);
    const listSubCategoryId = listSubCategory.map(item => item.id);
    const products = await Product.find({
        deleted: false,
        status: "active",
        parent_category_id : { $in : [ category.id ,...listSubCategoryId]}
    }).sort({position : "desc"});

    const newProduct = productHeplers.priceNewProducts(products);
    
    res.render("client/pages/products/index.pug", {
        pageTitle: category.title,
        products: newProduct
    });
}