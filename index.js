
const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');

const flash = require('express-flash'); 
require("dotenv").config();


// Ket noi database
const database = require("./config/database");
database.connect();

const systemConfig = require("./config/system");

const router = require("./routers/clients/index.router");
const routerAdmin = require("./routers/admin/index.router");



const app = express()

const port = process.env.PORT;  


app.set("views","./views");
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

// App locals Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin; // chỉ đc dùng trong file pug

app.use(express.static("public"));

app.use(methodOverride('_method'));

// app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routers
router(app);
routerAdmin(app);

// app.use(express.static('public'));

app.listen(
    port , ()=>{
        console.log(`xample app listening on port ${port}`)
    }
)

//1:28