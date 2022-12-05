const express = require('express');
const router = express.Router();

/* controller*/

const {totals} = require('../../controllers/api/mainApiController');

// rutas
// /api

router
    .get('/totals', totals)
    
module.exports = router;