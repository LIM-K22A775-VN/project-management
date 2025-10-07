const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    position: Number,
    deleted: Boolean,
    deletedAt: Date
});
const modelProduct = mongoose.model('modelProduct', productSchema, "products");
// products : ten collection trong db
// modelProduct : ten model

module.exports = modelProduct;