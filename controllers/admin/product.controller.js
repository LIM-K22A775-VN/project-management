const Product = require("../../models/product.model.js")

const filterStatusHelper = require("../../helpers/filterStatus.js")

// [GET] /admin/products
module.exports.index = async (req, res) => {
    // khi nhập   http://localhost:3000/admin/products?status=active  
    // console.log(req.query); // trả ra { status: 'active' }
    // console.log(req.query.status); // trả ra active

   //Đoạn bộ lọc

    const filterStatus = filterStatusHelper(req);
    console.log(filterStatus);
    let find = {
        deleted: false
    }
    if (req.query.status) {
        find.status = req.query.status;
    }
    //tính năng tìm kiếm
    let keyword ="";
    if (req.query.keyword) {
        keyword = req.query.keyword.trim();
        find.title = new RegExp(keyword, "i"); // "i" để không phân biệt chữ hoa thường
    }
    // Nếu keyword = "iPhone", thì dòng đó tương đương với /iPhone/i.
    // MongoDB hiểu $regex (regular expression) là biểu thức tìm kiếm theo mẫu,
    //  nên nó sẽ đi quét qua mọi document trong collection products 
    //  để tìm các bản ghi có title khớp với mẫu /iPhone/i.

    const products = await Product.find(find);
    res.render("admin/pages/products/index.pug", {
        pageTitle: "Danh sách sản phẩm",
        products: products,
        filterStatus:filterStatus,
        name: req.query.status == "active" ? "Đang hoạt động" : req.query.status == "inactive"?
        "Dừng hoạt động" : "Tất cả" ,
        keyword : keyword
    });
} // tem ham la index





module.exports.create = (req, res) => {
    res.render("admin/pages/products/index.pug");
} // tem ham la index
module.exports.edit = (req, res) => {
    res.render("admin/pages/products/index.pug");
} // tem ham la edit