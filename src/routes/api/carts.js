const express = require('express');
const router = express.Router();

/* controller*/

const {list, addItem, removeItem, removeAllItem} = require('../../controllers/api/cartsApiController');

// rutas
// /api/carts

router
    .get('/', list)
    .post('/:id', addItem)
    .delete('/all/:id',removeAllItem)
    .delete('/:id',removeItem)
    
module.exports = router;