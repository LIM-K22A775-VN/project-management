const Product = require("../../models/product.model.js")
// Đây là model trong Mongoose — nó đại diện cho một bảng (collection) trong MongoDB.
const filterStatusHelper = require("../../helpers/filterStatus.js")
const searchHelper = require("../../helpers/search.js")
const paginationHelper = require("../../helpers/pagination.js")

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
    const countProducts = await Product.countDocuments(find); // userModel.countDocuments : lấy ra số lượng pt
    let objectPagination = paginationHelper({
            currentPage: 1, // trang hiện tại , gs = 1
            limitItems: 4, // tối đa bao nhiêu sản phẩm         
        },
        req,
        countProducts
    );
    //End Pagination

    const products = await Product.find(find)
        .sort({position : "desc"}) // asc : tăng dần , desc : giảm dần
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

// [PATCH] /admin/products/changestatus/:status/:id
//thay đổi trạng thái hoạt động dừng hoạt động cho sản phẩm
module.exports.changeStatus = async (req, res) => {
    //  console.log(req.params); 
     //{ status: 'active', id: '123' } lấy được thông tin trên url
    // res.render("admin/pages/products/index.pug");
    const status = req.params.status; // ;lấy thông tin trên url
    const id = req.params.id;
    //update database
    await Product.updateOne({_id : id} , {status : status });
    // in thông báo thành công
    req.flash('success' , 'Cập nhật trạng thái thành công');
    // console.log(m);
    res.redirect(req.get("Referer"|| "/admin/products") ,

);

}
// thay doi trang thai nhieu san pham
// PATCH /admin/products/change-multi 
module.exports.changeMulti = async (req, res) => {
    // console.log(req.body); // đây là mình gửi từ public lên
    const type = req.body.type; // kiểu
    const ids = req.body.ids.split(", ");
    switch (type) {
        case "active":
        case "inactive" :
            await Product.updateMany({_id : {$in: ids}} , {status : type });
            req.flash('success' , `Cập nhật trạng thái ${ids.length} sản phẩm thành công`);
            break;
        case "delete-all":
            await Product.updateMany({_id : {$in: ids}} , {
                deleted : true,
                deletedAt: new Date()
             });
             req.flash('success' , `Xóa ${ids.length} sản phẩm thành công`);
            break;       
        case "change-position":
            for (const item of ids) {
                 let[id,position] = item.split("-");
                 position = parseInt(position);
                 await Product.updateOne({_id : id} ,{position : position} );
                 req.flash('success' , `Thay đổi vị trí ${ids.length} sản phẩm thành công`);
            }       
            break;       
        default:
            break;
    }
    res.redirect(req.get("Referer"|| "/admin/products"));
}

// [DELETE] /admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;

    // await Product.deleteOne({_id : id}); //trong db mất luôn
    await Product.updateOne({_id : id} , {
        deleted : true,    //update truong delete : false / true
        deletedAt: new Date()
    });
    req.flash('success' , `Xóa sản phẩm thành công`);
    res.redirect(req.get("Referer"|| "/admin/products"));
}

module.exports.thungrac = (req, res) => {
    res.render("admin/pages/thungrac/index.pug");
} 
module.exports.create = (req, res) => {
    res.render("admin/pages/products/index.pug");
} // tem ham la index
module.exports.edit = (req, res) => {
    res.render("admin/pages/products/index.pug");
} // tem ham la edit

