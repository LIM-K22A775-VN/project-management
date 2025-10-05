const Product = require("../../models/product.model.js")

const filterStatusHelper = require("../../helpers/filterStatus.js")
const searchHelper = require("../../helpers/search.js")

// [GET] /admin/products
module.exports.index = async (req, res) => {
    // khi nhập   http://localhost:3000/admin/products?status=active  
    // console.log(req.query); // trả ra { status: 'active' }
    // console.log(req.query.status); // trả ra active

   //Start Đoạn bộ lọc
    const filterStatus = filterStatusHelper(req);
    // console.log(filterStatus);
    //End Đoạn bộ lọc
    
    // Start Tìm kiếm
    const objectSearch = searchHelper(req); 
    // End Tìm kiếm
    let find = {
        deleted: false
    }
    if (req.query.status) {
        find.status = req.query.status;
    }
    if (req.query.keyword) {
        find.title = objectSearch.regex;
    }

    const products = await Product.find(find);
    res.render("admin/pages/products/index.pug", {
        pageTitle: "Danh sách sản phẩm",
        products: products,
        filterStatus:filterStatus,
        name: req.query.status == "active" ? "Đang hoạt động" : req.query.status == "inactive"?
        "Dừng hoạt động" : "Tất cả" ,
        keyword : objectSearch.keyword
    });
} // tem ham la index





module.exports.create = (req, res) => {
    res.render("admin/pages/products/index.pug");
} // tem ham la index
module.exports.edit = (req, res) => {
    res.render("admin/pages/products/index.pug");
} // tem ham la edit