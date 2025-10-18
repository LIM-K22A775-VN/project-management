const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const productCategorySchema = new mongoose.Schema({
    title: String,   //San pham 1
    parent_id : {
        type:String,
        default:""
    },
    description: String,
    thumbnail: String,
    status: String,
    position: Number,
    slug: { type: String, slug: "title" , unique : true }, // slug -> san-pham-1 unique : true -> duy nhất
    deleted: {
        type :Boolean,
        default:false  // nếu ngta truyền vào thì lấy giá trị ngta nếu k truyền vào thì mặc định là false
    },
    deletedAt: Date
}, {
    timestamps : true // hỗ trợ tự động thêm thời gian khi mình add hay update sản phẩm
}
);
const modelProductCategory = mongoose.model('modelProductCategory', productCategorySchema, "products-category");
// products-category : ten collection trong db
// modelProduct : ten model

module.exports = modelProductCategory;