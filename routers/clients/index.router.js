const productRouter = require("./product.router");
const searchRouter = require("./search.router");
const homeRouter = require("./home.router");
const cartRouter = require("./cart.router");
const checkoutRouter = require("./checkout.router");
const userRouter = require("./user.router");
const chatRouter = require("./chat.route");

const categoryMiddleware = require("../../middlewares/client/category.middleware");
const cartMiddleware = require("../../middlewares/client/cart.middleware");
const userMiddleware = require("../../middlewares/client/user.middleware");
const settingMiddleware = require("../../middlewares/client/setting.middelware");

module.exports = (app) => {
    
    app.use(categoryMiddleware.category);
    app.use(cartMiddleware.cartId);
    app.use(userMiddleware.inforUser);
    app.use(settingMiddleware.settingGeneral);
    

    app.use('/', homeRouter);
    app.use('/search', searchRouter);
    app.use("/products", productRouter);
    app.use("/cart", cartRouter);
    app.use("/checkout", checkoutRouter);
    app.use("/user", userRouter);
    app.use("/chat", chatRouter);
}