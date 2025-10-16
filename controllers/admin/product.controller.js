const Product = require("../../models/product.model.js")
// Đây là model trong Mongoose — nó đại diện cho một bảng (collection) trong MongoDB.
const filterStatusHelper = require("../../helpers/filterStatus.js")
const searchHelper = require("../../helpers/search.js")
const paginationHelper = require("../../helpers/pagination.js")
const systemConfig = require("../../config/system.js")
// const productValidate = require("../../validates/admin/product.validate.js")
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
        .sort({
            position: "desc"
        }) // asc : tăng dần , desc : giảm dần
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
    await Product.updateOne({
        _id: id
    }, {
        status: status
    });
    // in thông báo thành công
    req.flash('success', 'Cập nhật trạng thái thành công');
    // console.log(m);
    res.redirect(req.get("Referer" || "/admin/products"),

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
        case "inactive":
            await Product.updateMany({
                _id: {
                    $in: ids
                }
            }, {
                status: type
            });
            req.flash('success', `Cập nhật trạng thái ${ids.length} sản phẩm thành công`);
            break;
        case "delete-all":
            await Product.updateMany({
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
                await Product.updateOne({
                    _id: id
                }, {
                    position: position
                });
                req.flash('success', `Thay đổi vị trí ${ids.length} sản phẩm thành công`);
            }
            break;
        default:
            break;
    }
    res.redirect(req.get("Referer" || "/admin/products"));
}

// [DELETE] /admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;

    // await Product.deleteOne({_id : id}); //trong db mất luôn
    await Product.updateOne({
        _id: id
    }, {
        deleted: true, //update truong delete : false / true
        deletedAt: new Date()
    });
    req.flash('success', `Xóa sản phẩm thành công`);
    res.redirect(req.get("Referer" || "/admin/products"));
}

module.exports.thungrac = (req, res) => {
    res.render("admin/pages/thungrac/index.pug");
}

// [GET] /admin/products/create
module.exports.create = async (req, res) => {
    res.render("admin/pages/products/create.pug", {
        pageTitle: "Thêm mới sản phẩm",
    });
}
//[POST] /admin/products/create
module.exports.createPost = async (req, res) => {

    // if(!productValidate.creatPost(req, res)){
    //     return;
    // }

    req.body.price = parseFloat(req.body.price);
    req.body.discountPercentage = parseFloat(req.body.discountPercentage);
    req.body.stock = parseFloat(req.body.stock);

    if (req.body.position) {
        req.body.position = parseFloat(req.body.position);
    } else {
        const count = await Product.countDocuments();
        req.body.position = count + 1;
    }
    // if (req.file) {
    //     req.body.thumbnail = `/uploads/${req.file.filename}`;
    // }

    // console.log(req.body);
    console.log(req.body.thumbnail);
    // Với text fields (như title) → Multer bỏ vào req.body.
    // Với file fields (như thumbnail) → Multer bỏ và o req.file hoặc req.files.
    const product = new Product(req.body); // tạo mới 1 sản phấm ở bên phía mô đồ
    await product.save(); // lưu vào db
    req.flash('success', `Thêm sản phẩm thành công`);
    res.redirect(`${systemConfig.prefixAdmin}/products`);
}

//[GET] /admin/products/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const find = {
            deleted: false,
            _id: req.params.id // chính là :id 
        };

        const product = await Product.findOne(find);
        console.log(product);
        res.render("admin/pages/products/edit.pug", {
            pageTitle: "Thêm mới sản phẩm",
            product: product
        });
    } catch (error) {
        req.flash("error" , "Lỗi do không tồn tại id")
        res.redirect("/admin/products");
    }
}


//[PATCH] /admin/products/edit/:id
module.exports.editPatch = async (req, res) => {
    const id = req.params.id;
    try {
        // Ép kiểu dữ liệu số
        req.body.price = parseFloat(req.body.price);
        req.body.discountPercentage = parseFloat(req.body.discountPercentage);
        req.body.stock = parseFloat(req.body.stock);

        if (req.body.position) {
            req.body.position = parseFloat(req.body.position);
        } else {
            const count = await Product.countDocuments();
            req.body.position = count + 1;
        }

        // Nếu có file ảnh mới thì cập nhật thumbnail
        if (req.file) {
            req.body.thumbnail = `/uploads/${req.file.filename}`;
        }

        // Cập nhật document trong MongoDB
        // await Product.findByIdAndUpdate(id, req.body);
        await Product.updateOne({_id : id}, req.body);

        req.flash('success', 'Cập nhật sản phẩm thành công');
        res.redirect(`${systemConfig.prefixAdmin}/products`);
    } catch (err) {
        console.error('Lỗi khi cập nhật sản phẩm:', err);
        req.flash('error', 'Có lỗi xảy ra khi cập nhật sản phẩm');
        res.redirect(`${systemConfig.prefixAdmin}/products`);
    }
};


//[GET] admin/products/edit/:id
module.exports.detail = async (req, res) => {
    try {
        const find = {
            deleted: false,
            _id: req.params.id // chính là :id 
        };

        const product = await Product.findOne(find);
        console.log(product);
        res.render("admin/pages/products/detail.pug", {
            pageTitle: product.title,
            product: product
        });
    } catch (error) {
        req.flash("error" , "Lỗi do không tồn tại id")
        res.redirect("/admin/products");
    }
}
