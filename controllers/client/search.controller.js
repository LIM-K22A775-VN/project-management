const Product = require("../../models/product.model.js");
const productHeplers = require("../../helpers/product");
module.exports.index = async (req,res)=>{ 
    let newProducts = [];
    const keyword = req.query.keyword;
    if(keyword){
        const regex = new RegExp (keyword, "i");
        const products = await Product.find({
            title : regex,
            deleted : false,
            status: "active"
        });
        console.log(products);
        newProducts  = productHeplers.priceNewProducts(products);
    }
    
    res.render("client/pages/search/index.pug", {
        pageTitle: "Kết quả tìm kiếm",
        keyword : keyword,
        products : newProducts
    });
}   