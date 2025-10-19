module.exports.creatPost = (req, res, next) => {
    if (!req.body.title) {
        req.flash('error', `Vui lòng nhập tiêu đề!`);
        res.redirect(`/admin/products-category/create`);
        return;
    }
    if (req.body.title.length < 6) {
        req.flash('error', `Vui lòng nhập tiêu đề ít nhất 6 kí tự!`);
        res.redirect(`/admin/products-category/create`);
        return;
    }
    next();
}
