const {check, body} = require('express-validator');
//const db = require('../database/models');

module.exports = [
    check('name')
        .notEmpty()
        .withMessage('El nombre del producto es obligatorio').bail()
        .isLength({
            min : 5,
            max : 20
        }).withMessage('El nombre debe tener entre 5 y 20 caracteres'),
    check('categoryId')
        .notEmpty()
        .withMessage('Debes indicar la categoria'),
    check('price')
        .notEmpty()
        .withMessage('El precio es requerido').bail()
        .isNumeric({
            no_symbols: true
        }).withMessage('Solo números positivos'),
    check('description')
        .notEmpty()
        .withMessage('Debe agregar una descripción').bail()
        .isLength({
            min : 5,
            max : 20
        }).withMessage('El nombre debe tener entre 5 y 20 caracteres')
   
]