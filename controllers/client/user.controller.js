const User = require("../../models/user.model");
const md5 = require("md5");
module.exports.register = (req,res)=>{
    res.render("client/pages/user/register" ,{
        pageTitle :"Đăng ký tài khoản"
    } );
}; 
module.exports.registerPost = async (req,res)=>{

    const existEmail = await User.findOne({
        email : req.body.email
    });


    if(existEmail){
        req.flash("error" , "Email đã tồn tại" );
        res.redirect("/user/register");
        return;
    }
    req.body.password = md5(req.body.password);
    const user = new User(req.body);
    await user.save();
    req.flash("success" , "Đăng ký thành công" );

    // cho đăng nhập luôn
    res.cookie("tokenUser" , user.tokenUser)

    res.redirect("/");
};      