const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const productSchema = new mongoose.Schema({
    title: String,   //San pham 1
    parent_category_id : {
        type : String,
        default:""
    },
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    position: Number,
    slug: { type: String, slug: "title" , unique : true }, // slug -> san-pham-1 unique : true -> duy nhất
    createdBy : {
        account_id : String,
        createdAt : {
            type : Date,
            default : Date.now
        }
    },
    deleted: {
        type :Boolean,
        default:false  // nếu ngta truyền vào thì lấy giá trị ngta nếu k truyền vào thì mặc định là false
    },
    deletedAt: Date
}, {
    timestamps : true // hỗ trợ tự động thêm thời gian khi mình add hay update sản phẩm
}
);
const modelProduct = mongoose.model('modelProduct', productSchema, "products");
// products : ten collection trong db
// modelProduct : ten model

module.exports = modelProduct;