const mongoose = require("mongoose");
const generate = require("../helpers/generate");
const accountSchema = new mongoose.Schema({
    fullName: String,
    email : String,
    password : String,
    token : {
        type:String,
        default:generate.generateRandomString(20)
    },
    phone:String,
    avatar :String,
    role_id : String , // lưu id của quyền vd: id quyền quản trị viên
    status :String,
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
}, {
    timestamps: true // hỗ trợ tự động thêm thời gian khi mình add hay update sản phẩm
});
const modelAccount = mongoose.model('modelmodelAccount', accountSchema, "accounts");

module.exports = modelAccount;