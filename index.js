const express = require('express');
// const mongoose = require('mongoose');
// mongoose.connect('mongodb://127.0.0.1:27017/product-test-18');
require("dotenv").config();
const router = require("./routers/clients/index.router");

const app = express()
const port = process.env.PORT;  


// const Product = mongoose.model('Product',{ 
//     title: String,
//     price: Number,
//     thumbnail: String
// }); 



app.set("views","./views");
app.set("view engine" , "pug");


// Routers
router(app);


// app.use(express.static('public'));

app.listen(
    port , ()=>{
        console.log(`xample app listening on port ${port}`)
    }
)
