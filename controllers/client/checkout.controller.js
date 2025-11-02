const Cart = require("../../models/cart.model");
const Product = require("../../models/product.model");
const Order = require("../../models/order.model");
const productsHelper = require("../../helpers/product");
//[GET] /checkout/
module.exports.index = async (req, res) => {
    const cartId = req.cookies.cartId;
    const cart = await Cart.findOne({
        _id: cartId
    });

    if (cart.products.length > 0) {
        for (const item of cart.products) {
            const productId = item.product_id;
            const productInfo = await Product.findOne({
                _id: productId,
                deleted: false
            }).select("title thumbnail slug price discountPercentage");

            productInfo.priceNew = productsHelper.priceNewProduct(productInfo);

            item.productInfo = productInfo;

            item.totalPrice = productInfo.priceNew * item.quantity;
        }
    }

    cart.totalPrice = cart.products.reduce((sum, item) => sum + item.totalPrice, 0);

    res.render("client/pages/checkout/index", {
        pageTitle: "Đặt hàng",
        cartDetail: cart
    })
}

//[POST] /checkout/order
module.exports.orderPost = async (req, res) => {

    // id giỏ hàng : chưa đăng nhập nên lưu tạm vào cookies
    const cartId = req.cookies.cartId;
    // thông tin mà người dùng gửi quan form : fullName , phone , address
    const userInfo = req.body;

    // lấy ra giỏ hàng có cartId
    const cart = await Cart.findOne({
        _id: cartId,
    });

    const products = [];
    // duyệt các products có trong cart để lưu vào order
    for (const product of cart.products) {
        // trong model order có trường  products để lưu những sp người  dùng đặt
        const objectProduct = {
            product_id: product.product_id,
            price: 0,
            discountPercentage: 0,
            quantity: product.quantity,
        }
        // truy vấn trực tiếp vào model Product vì giỏ hàng chỉ chứa 1 số thông tin cần thiết 
        const productInfor = await Product.findOne({
            _id: product.product_id
        }).select("price discountPercentage");
        // thêm những thông tin cần thiết add vào order 
        objectProduct.price = productInfor.price;
        objectProduct.discountPercentage = productInfor.discountPercentage;
        // hoàn thành products
        products.push(objectProduct);
    }
    // thông tin đơn hàng để lưu vào model order
    const orderInfor = {
        cart_id: cartId,
        userInfo: userInfo,
        products: products,
    }
    // lưu vào db order 
    const order = new Order(orderInfor);
    order.save();

    // sau khi đặt hàng xong thì xóa hết những sản phẩm đã đặt trong giỏ hàng
    const productIds = products.map(p => p.product_id);

    await Cart.updateOne({
        _id: cartId
    }, {
        $pull: {
            products: {
                product_id: {
                    $in: productIds
                }
            }
        }
    });


    res.redirect(`/checkout/success/${order.id}`);
}

module.exports.success = async(req,res)=>{
    // res.send(req.params.orderId);
    res.render("client/pages/checkout/success",{
        pageTitle: "Đặt hàng thành công"
    })
}