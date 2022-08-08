const express = require('express');
const router = express.Router();


const {productDetail, productCart} = require('../controllers/productController')

/* /products*/

router
    .get('/productDetail', productDetail)
    .get('/productCart', productCart)

module.exports = router;