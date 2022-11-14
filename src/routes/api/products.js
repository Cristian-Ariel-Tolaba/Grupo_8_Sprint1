const express = require('express');
const router = express.Router();

/* controller*/

const {all, detail, images} = require('../../controllers/api/productsApiController');

// rutas
// /api/products

router
    .get('/', all)
    .get('/:id', detail)
    .get('/images/:image', images)

module.exports = router;