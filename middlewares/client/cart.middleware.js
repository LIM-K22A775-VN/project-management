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
        // nếu có giỏ thì lấy ra 
        const cart = await Cart.findOne({
            _id : req.cookies.cartId
        });
        const totalQuantity = cart.products.reduce((sum,item) =>
            sum + item.quantity
            , 0 ); // lấy tổng số lượng sản phẩm mà người dùng thêm vào giỏ hàng
        cart.totalQuantity = totalQuantity;
        res.locals.miniCart = cart;

    }
    next();

}