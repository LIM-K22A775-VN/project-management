const ProductCategory = require("../../models/product-category.model");
const filterStatusHelper = require("../../helpers/filterStatus.js")
const filterSortHelper = require("../../helpers/filterSort.js")
const searchHelper = require("../../helpers/search.js")
const paginationHelper = require("../../helpers/pagination.js")
const systemConfig = require("../../config/system.js")
//[GET] /admin/products-category
module.exports.index = async (req, res) => {
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
    //Start Đoạn bộ lọc
    
    const filterSort = filterSortHelper(req);
    
    // Start Tìm kiếm
    const objectSearch = searchHelper(req);
    if (req.query.keyword) {
        find.title = objectSearch.regex;
    }
    // End Tìm kiếm


    //Start Pagination - Phân trang
    const countProducts = await ProductCategory.countDocuments(find); // userModel.countDocuments : lấy ra số lượng pt
    let objectPagination = paginationHelper({
            currentPage: 1, // trang hiện tại , gs = 1
            limitItems: 4, // tối đa bao nhiêu sản phẩm         
        },
        req,
        countProducts
    );
    //End Pagination

    // START SORT
    let sort = {
        
    };
    if(req.query.sortKey && req.query.sortValue){
        sort[req.query.sortKey] = req.query.sortValue;
    }
    else{
        sort.position = "desc";
    } 
    // END SORT

    const records = await ProductCategory.find(find)
        .sort(sort) // asc : tăng dần , desc : giảm dần
        .limit(objectPagination.limitItems) // giới hạn 4 sản phẩm
        .skip(objectPagination.skip); // bỏ qua bao nhiêu sản phẩm

    res.render("admin/pages/products-category/index.pug", {
        pageTitle: "Danh sách sản phẩm",
        records: records,
        filterStatus: filterStatus,
        filterSort : filterSort,
        name: req.query.status == "active" ? "Đang hoạt động" : req.query.status == "inactive" ?
            "Dừng hoạt động" : "Tất cả",
        nameSort: `${req.query.sortKey}-${req.query.sortValue}`,
        keyword: objectSearch.keyword,
        pagination: objectPagination
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


// [PATCH] /admin/products/changestatus/:status/:id
//thay đổi trạng thái hoạt động dừng hoạt động cho sản phẩm
module.exports.changeStatus = async (req, res) => {

    const status = req.params.status; // ;lấy thông tin trên url
    const id = req.params.id;
    //update database
    await ProductCategory.updateOne({
        _id: id
    }, {
        status: status
    });
    // in thông báo thành công
    req.flash('success', 'Cập nhật trạng thái thành công');
    // console.log(m);
    res.redirect(req.get("Referer" || "/admin/products-category"),

    );

}
// thay doi trang thai nhieu san pham
// PATCH /admin/products/change-multi 
module.exports.changeMulti = async (req, res) => {
    console.log(req.body); // đây là mình gửi từ public lên
    const type = req.body.type; // kiểu
    const ids = req.body.ids.split(", ");
    switch (type) {
        case "active":
        case "inactive":
            await ProductCategory.updateMany({
                _id: {
                    $in: ids
                }
            }, {
                status: type
            });
            req.flash('success', `Cập nhật trạng thái ${ids.length} sản phẩm thành công`);
            break;
        case "delete-all":
            await ProductCategory.updateMany({
                _id: {
                    $in: ids
                }
            }, {
                deleted: true,
                deletedAt: new Date()
            });
            req.flash('success', `Xóa ${ids.length} sản phẩm thành công`);
            break;
        case "change-position":
            for (const item of ids) {
                let [id, position] = item.split("-");
                position = parseInt(position);
                await ProductCategory.updateOne({
                    _id: id
                }, {
                    position: position
                });              
            }
            req.flash('success', `Thay đổi vị trí ${ids.length} sản phẩm thành công`);
            break;
        default:
            break;
    }
    res.redirect(req.get("Referer" || "/admin/products-category"));
}

// [DELETE] /admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;

    // await ProductCategory.deleteOne({_id : id}); //trong db mất luôn
    await ProductCategory.updateOne({
        _id: id
    }, {
        deleted: true, //update truong delete : false / true
        deletedAt: new Date()
    });
    req.flash('success', `Xóa sản phẩm thành công`);
    res.redirect(req.get("Referer" || "/admin/products-category"));

}

module.exports.thungrac = (req, res) => {
    res.render("admin/pages/thungrac/index.pug");
}

//[GET] /admin/products/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const find = {
            deleted: false,
            _id: req.params.id // chính là :id 
        };

        const product = await ProductCategory.findOne(find);
        res.render("admin/pages/products-category/edit.pug", {
            pageTitle: "Chỉnh sửa danh mục",
            product: product
        });
    } catch (error) {
        req.flash("error", "Lỗi do không tồn tại id")
        res.redirect("/admin/products-category");
    }
}


//[PATCH] /admin/products/edit/:id
module.exports.editPatch = async (req, res) => {
    const id = req.params.id;
    try {

        if (req.body.position) {
            req.body.position = parseFloat(req.body.position);
        } else {
            const count = await ProductCategory.countDocuments();
            req.body.position = count + 1;
        }
        await ProductCategory.updateOne({
            _id: id
        }, req.body);

        req.flash('success', 'Cập nhật sản phẩm thành công');
        res.redirect(`${systemConfig.prefixAdmin}/products-category`);
    } catch (err) {
        console.error('Lỗi khi cập nhật sản phẩm:', err);
        req.flash('error', 'Có lỗi xảy ra khi cập nhật sản phẩm');
        res.redirect(`${systemConfig.prefixAdmin}/products-category`);
    }
};


//[GET] admin/products/edit/:id
module.exports.detail = async (req, res) => {
    try {
        const find = {
            deleted: false,
            _id: req.params.id // chính là :id 
        };

        const product = await ProductCategory.findOne(find);
        console.log(product);
        res.render("admin/pages/products-category/detail.pug", {
            pageTitle: product.title,
            product: product
        });
    } catch (error) {
        req.flash("error", "Lỗi do không tồn tại id")
        res.redirect("/admin/products-category");
    }
}

