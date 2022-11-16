const express = require('express');
const router = express.Router();

/* controller*/

const {index, create, store, detail, edit, update, destroy, cart, list} = require('../controllers/productController');

const uploadProduct = require('../middlewares/upLoadFilesProduct');

const {productCreateValidator, productEditValidator} = require('../validations')

const adminUserCheck = require('../middlewares/adminUserCheck');
const userUserCheck = require('../middlewares/userUserCheck');

router
    .get('/', index)
    .get('/list', list)
    .get('/create', adminUserCheck, create)
    .post('/store', uploadProduct.array('image'),productCreateValidator, store)
    .get('/detail/:id', detail)

    .get('/edit/:id',adminUserCheck, edit)
    .put('/update/:id',uploadProduct.array('image'), productEditValidator, update)

    .delete('/delete/:id', adminUserCheck, destroy)
    .get('/cart', cart)

module.exports = router;
