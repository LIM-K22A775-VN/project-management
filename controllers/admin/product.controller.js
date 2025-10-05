const Product = require("../../models/product.model")


// [GET] /admin/products
module.exports.index = async (req, res) => {
    // khi nhập   http://localhost:3000/admin/products?status=active  
    // console.log(req.query); // trả ra { status: 'active' }
    // console.log(req.query.status); // trả ra active

    // vẽ ra các nút Hoạt động ,dừng hoạt động ,tất cả
    let filterStatus = [
        {
            name:"Tất cả",
            status:"",
            class:"" //active để bôi xanh nút bấm vào
        },
        {
            name:"Hoạt động",
            status:"active",
            class:""
        },
        {
            name:"Dừng hoạt động",
            status:"inactive",
            class:""
        },
    ];

    // if(req.query.status){
    //     filterStatus.forEach((item) =>{
    //         if(item.status === req.query.status){
    //             item.class = "active";
    //         }
    //         else{
    //              item.class = "";
    //         }
    //     })
    // }
    if(req.query.status){
        // lấy ra phần tử đó và gán active cho class
        filterStatus.find(item => item.status == req.query.status).class = "active";
    }
    else{
        filterStatus.find(item => item.status == "").class = "active";
        // filterStatus[0].class = "active";
    }
    let find = {
        deleted: false
    }
    if (req.query.status) {
        find.status = req.query.status;
    }

    const products = await Product.find(find);
    res.render("admin/pages/products/index.pug", {
        pageTitle: "Danh sách sản phẩm",
        products: products,
        filterStatus:filterStatus,
        name: req.query.status == "active" ? "Đang hoạt động" : req.query.status == "inactive"?
        "Dừng hoạt động" : "Tất cả" 
    });
} // tem ham la index
module.exports.create = (req, res) => {
    res.render("admin/pages/products/index.pug");
} // tem ham la index
module.exports.edit = (req, res) => {
    res.render("admin/pages/products/index.pug");
} // tem ham la edit