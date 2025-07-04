const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const vendorAuthRoutes = require('./Routes/vendorRoutes')
const userAuthRoutes = require('./Routes/userRoutes')
const vendorProductsRoute = require('./Routes/vendorProductsRoutes')
const userProductsRoute = require('./Routes/userProductsRoutes')
require('./Models/dbConnection')
const PORT = process.env.PORT || 8080;
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

// Serve static files for images
app.use("/image", express.static(path.join(__dirname, "public/image")));

// vendor login/signup
app.use('/vendor', vendorAuthRoutes)

// vendor shops/products listing/getting own products
app.use('/vendor',vendorProductsRoute)

// user login/signup 
app.use('/user', userAuthRoutes)
 
// user get products
app.use('/user', userProductsRoute)

app.get("/", (req, res)=>{
    res.send("Welcome")
})



app.listen(PORT, (err)=>{
    if (err){
        console.log(err)
    }
    else{
        console.log(`http://localhost:${PORT}`)
    }
})
