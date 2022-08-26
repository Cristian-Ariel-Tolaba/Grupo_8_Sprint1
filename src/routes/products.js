const express = require('express');
const router = express.Router();

/* controller*/

const {index, create, store, detail, edit, update, destroy, cart, list} = require('../controllers/productController');


router
    .get('/', index)
    .get('/list', list)
    .get('/create', create)
    .post('/store', store)
    .get('/detail/:id', detail)

    .get('/edit/:id', edit)
    .put('/update/:id', update)

    .delete('/delete/:id', destroy)
    .get('/cart', cart)

module.exports = router;
