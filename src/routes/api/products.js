const express = require('express');
const router = express.Router();

/* controller*/

const {all, detail, images, last, store, update, destroy} = require('../../controllers/api/productsApiController');
const uploadProduct = require('../../middlewares/upLoadFilesProduct');

// rutas
// /api/products

router
    .get('/', all)
    .get('/last',last)
    .get('/:id', detail)
    .get('/images/:image', images)
    .post('/', uploadProduct.single('image'), store)
    .patch('/:id', uploadProduct.single('image'),update)
    .delete('/:id', destroy)

module.exports = router;