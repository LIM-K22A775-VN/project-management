
const dashboardRouters = require("./dashboard.router");
const ProductRouters = require("./product.router");
const ProductCategoryRouters = require("./product-category.router");
const roleRouters = require("./role.router");
const systemConfig = require("../../config/system")
module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin;
    app.use(PATH_ADMIN + '/dashboard',dashboardRouters);
    app.use(PATH_ADMIN + '/products',ProductRouters); 
    app.use(PATH_ADMIN + '/products-category',ProductCategoryRouters); 
    app.use(PATH_ADMIN + '/roles',roleRouters); 
}