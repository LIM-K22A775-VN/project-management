
const dashboardRouter = require("./dashboard.router");
const ProductRouter = require("./product.router");
const ProductCategoryRouter = require("./product-category.router");
const systemConfig = require("../../config/system")
module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin;
    app.use(PATH_ADMIN + '/dashboard',dashboardRouter);
    app.use(PATH_ADMIN + '/products',ProductRouter); 
    app.use(PATH_ADMIN + '/products-category',ProductCategoryRouter); 
}