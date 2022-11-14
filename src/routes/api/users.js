const express = require('express');
const router = express.Router();

/* controller*/

const {all, detail, image} = require('../../controllers/api/usersApiController');

// rutas
// /api/users

router
    .get('/', all)
    .get('/:id', detail)
    .get('/image/:img', image)

module.exports = router;