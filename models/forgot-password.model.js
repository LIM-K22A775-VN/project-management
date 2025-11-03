const mongoose = require("mongoose");

const forgotPasswordSchema = new mongoose.Schema({
    email :String,
    otp : String,
    exprireAt :{
        type :Date,
        expires : 180 // hết hạn sau 180s  
    } // thời gian hết hạn otp
}, {
    timestamps: true
});
const ForgotPassword = mongoose.model('ForgotPassword', forgotPasswordSchema, "forgot-password");

module.exports = ForgotPassword;