const User = require("../../models/user.model.js");

module.exports.requireAuth = async (req, res, next) => {
    // console.log("luôn chạy vào đây");
    if (!req.cookies.tokenUser) {
        res.redirect(`/user/login`);
    } else {
        const user = await User.findOne({
            tokenUser : req.cookies.tokenUser
        }).select("-password-tokenUser");
        if (!user) {
            res.redirect(`/user/login`);
        } else {     
            res.locals.user = user;
            next();
        }
    }
}