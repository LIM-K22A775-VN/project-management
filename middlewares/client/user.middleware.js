const Cart = require("../../models/cart.model");
const User = require("../../models/user.model");
module.exports.inforUser = async (req, res, next) => {
    // console.log(req.cookies.tokenUser);
    if (req.cookies.tokenUser) {
        const user = await User.findOne({
            tokenUser: req.cookies.tokenUser,
            deleted: false,
            status: "active"
        }).select("-password");
        if (user) {
            res.locals.user = user;
        }
    }

    next();
}