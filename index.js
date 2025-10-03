const express = require('express');

require("dotenv").config();

// Ket noi database
const database = require("./config/database");
database.connect();

const router = require("./routers/clients/index.router");
const routerAdmin = require("./routers/admin/index.router");



const app = express()

const port = process.env.PORT;  


// const Product = mongoose.model('Product',{ 
//     title: String,
//     price: Number,
//     thumbnail: String
// }); 



app.set("views","./views");
app.set("view engine" , "pug");

app.use(express.static("public"));

// Routers
router(app);
routerAdmin(app);

// app.use(express.static('public'));

app.listen(
    port , ()=>{
        console.log(`xample app listening on port ${port}`)
    }
)
