
const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');

const flash = require('express-flash'); 
const moment = require('moment');
require("dotenv").config();




// Ket noi database
const database = require("./config/database");
database.connect();

const systemConfig = require("./config/system");

const router = require("./routers/clients/index.router");
const routerAdmin = require("./routers/admin/index.router");



const app = express()

const port = process.env.PORT;  


// app.set("views","./views");
app.set("views",`${__dirname}/views`);
app.set("view engine" , "pug");



//flash
const cookieParser = require('cookie-parser');
app.use(cookieParser('asdfsqfwee'));
const session = require('express-session');

app.use(session({
  secret: 'asdfsqfwee', // bí mật dùng để ký session
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 } // thời gian sống của cookie (ms)
}));

app.use(flash());
//flashs

// tinyMce
const path = require('path');
app.use('/tinymce', express.static(path.join(__dirname,'node_modules','tinymce')));
// tinyMce



// App locals Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin; // chỉ đc dùng trong file pug
app.locals.moment = moment; 

// app.use(express.static("public"));
app.use(express.static(`${__dirname}/public`));

app.use(methodOverride('_method'));

// app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routers
router(app);
routerAdmin(app);
//thêm router 
// * : các trường hợp còn lại . 404 : lỗi không tìm thấy đường dẫn
// Middleware 404 - phải đặt cuối cùng
app.use((req, res) => {
  res.status(404).render("client/pages/errors/404", {
    pageTitle: "404 Not Found"
  });
});
// Dòng res.status(404)
// Đặt HTTP status code cho response là 404 — tức là “Không tìm thấy trang” (Not Found).
// Nếu bạn không đặt, Express sẽ mặc định gửi status 200 (OK), điều này sai với lỗi 404.
// app.use(express.static('public'));

app.listen(
    port , ()=>{
        console.log(`xample app listening on port ${port}`)
    }
)

//1:11