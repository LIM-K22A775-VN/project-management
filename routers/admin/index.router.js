
const dashboardRouters = require("./dashboard.router");
const ProductRouters = require("./product.router");
const ProductCategoryRouters = require("./product-category.router");
const roleRouters = require("./role.router");
const accountRouters = require("./account.router");
const authRouters = require("./auth.router");
const systemConfig = require("../../config/system")
const authMiddelware = require("../../middlewares/admin/auth.middelware")
module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin;
    app.use(
        PATH_ADMIN + '/dashboard',
        authMiddelware.requireAuth,
        dashboardRouters
    );
    app.use(PATH_ADMIN + '/products',  authMiddelware.requireAuth, ProductRouters); 
    app.use(PATH_ADMIN + '/products-category',  authMiddelware.requireAuth, ProductCategoryRouters); 
    app.use(PATH_ADMIN + '/roles', authMiddelware.requireAuth, roleRouters); 
    app.use(PATH_ADMIN + '/accounts', authMiddelware.requireAuth, accountRouters); 
    app.use(PATH_ADMIN + '/auth',authRouters); 
}