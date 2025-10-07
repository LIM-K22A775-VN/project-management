const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');

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

// App locals Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

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

