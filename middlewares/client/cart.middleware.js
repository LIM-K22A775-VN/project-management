const Cart = require("../../models/cart.model");

module.exports.cartId = async (req, res, next) => {

    if(!req.cookies.cartId){
        // Tạo giỏ hàng
        const cart = new Cart();
        await cart.save();

        const expiresCookies = 1000 * 60 *60 *24 ; 

        res.cookie("cartId" , cart.id , {
            expires : new Date(Date.now() + 365 * expiresCookies)
        });
    }else{

    }
    next();

}