const Product = require("../../models/product.model.js")

const filterStatusHelper = require("../../helpers/filterStatus.js")
const searchHelper = require("../../helpers/search.js")

// [GET] /admin/products
module.exports.index = async (req, res) => {
    // khi nhập   http://localhost:3000/admin/products?status=active  
    // console.log(req.query); // trả ra { status: 'active' }
    // console.log(req.query.status); // trả ra active


    let find = {
        deleted: false
    }

    //Start Đoạn bộ lọc
    const filterStatus = filterStatusHelper(req);
    if (req.query.status) {
        find.status = req.query.status;
    }
    // console.log(filterStatus);
    //End Đoạn bộ lọc

    // Start Tìm kiếm
    const objectSearch = searchHelper(req);
    if (req.query.keyword) {
        find.title = objectSearch.regex;
    }
    // End Tìm kiếm


    //Start Pagination - Phân trang
    let objectPagination = {
        currentPage: 1, // trang hiện tại , gs = 1
        limitItems: 4 // tối đa bao nhiêu sản phẩm

    };
    if (req.query.page != null && !isNaN(req.query.page)) {
        objectPagination.currentPage = parseInt(req.query.page) > 1 ?
            parseInt(req.query.page) : objectPagination.currentPage; // trang hiện tại đang truyền lên url


    }
    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems;

    const countProducts = await Product.countDocuments(find); // userModel.countDocuments : lấy ra số lượng pt
    // lấy số sản phẩm
    // 1. Product
    // Đây là model trong Mongoose — nó đại diện cho một bảng (collection) trong MongoDB.
    // console.log(countProducts);

    const totalPage = Math.ceil(countProducts / objectPagination.limitItems); // đếm số trang
    //ceil : làm tròn lên 
    objectPagination.totalPage = totalPage;

    // xử lý start end cho phân trang
    
    if (objectPagination.currentPage == 1) {
        objectPagination.start = 1
        objectPagination.end = 3
    } else if (objectPagination.currentPage == objectPagination.totalPage) {
        objectPagination.start = objectPagination.totalPage - 2
        objectPagination.end = objectPagination.totalPage
    }else{
        objectPagination.start = objectPagination.currentPage - 1
        objectPagination.end = objectPagination.currentPage + 1
    }

    
    //End Pagination

    const products = await Product.find(find)
        .limit(objectPagination.limitItems) // giới hạn 4 sản phẩm
        .skip(objectPagination.skip); // bỏ qua bao nhiêu sản phẩm

    res.render("admin/pages/products/index.pug", {
        pageTitle: "Danh sách sản phẩm",
        products: products,
        filterStatus: filterStatus,
        name: req.query.status == "active" ? "Đang hoạt động" : req.query.status == "inactive" ?
            "Dừng hoạt động" : "Tất cả",
        keyword: objectSearch.keyword,
        pagination: objectPagination
    });
} // tem ham la index





module.exports.create = (req, res) => {
    res.render("admin/pages/products/index.pug");
} // tem ham la index
module.exports.edit = (req, res) => {
    res.render("admin/pages/products/index.pug");
} // tem ham la edit