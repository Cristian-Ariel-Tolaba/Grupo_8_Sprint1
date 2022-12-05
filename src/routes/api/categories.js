const express = require('express');
const router = express.Router();

/* controller*/

const {all} = require('../../controllers/api/categoriesApiController');

// rutas
// /api

router
    .get('/', all)
    
module.exports = router;