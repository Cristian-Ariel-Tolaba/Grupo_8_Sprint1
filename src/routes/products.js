const express = require('express');
const router = express.Router();


const {productDetail, productCart , add} = require('../controllers/productController')

/* /products*/

router
    .get('/productDetail', productDetail)
    .get('/productCart', productCart)
    .get('/add',add)
    


   

module.exports = router;