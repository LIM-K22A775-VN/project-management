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

module.exports.login = (req,res)=>{
    
    res.render("client/pages/user/login" ,{
        pageTitle :"Đăng nhập tài khoản"
    } );
}; 
module.exports.loginPost = async (req,res)=>{
    const user = await User.findOne({
          email : req.body.email,  
        //   password : md5(req.body.password),  
          deleted : false
    });

    if(!user){
        req.flash("error" ,"Email không tồn tại");
        res.redirect("/user/login");
        return;
    }
    if(!(md5(req.body.password) === user.password)){
        req.flash("error" ,"Mật khẩu không đúng");
        res.redirect("/user/login");
        return;
    }

    if(user.status === "inactive"){
        req.flash("error" ,"Tài khoản đang bị khóa");
        res.redirect("/user/login");
        return;
    }

    res.cookie("tokenUser" , user.tokenUser);
    req.flash("success" ,"Đăng nhập thành công");
    res.redirect("/");
}; 