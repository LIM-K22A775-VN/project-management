const productRouter = require("./product.router");
const homeRouter = require("./home.router");

module.exports = (app) => {

    app.use('/',homeRouter);

    // app.get('/products',  (req, res) => {
    //     res.render("client/pages/products/index.pug");
    // });
    app.use("/products",productRouter);
}