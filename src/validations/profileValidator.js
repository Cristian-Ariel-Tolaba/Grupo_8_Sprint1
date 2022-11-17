const {check, body} = require('express-validator');
const db = require('../database/models');

module.exports = [
    check('firstname')
        .notEmpty()
        .withMessage('El nombre es obligatorio').bail()
        .isLength({
            min : 3,
            max : 15
        }).withMessage('El nombre debe tener entre 3 y 15 caracteres'),
    check('lastname')
        .notEmpty()
        .withMessage('El apellido es obligatorio').bail()
        .isLength({
            min : 3,
            max : 15
        }).withMessage('El apellido debe tener entre 3 y 15 caracteres'),
    body('avatar')
        .custom((value,{req}) => {
            if(req.file){
                return true
            }else {
                return false
            }
        }).withMessage('Debes agregar una imagen')
        
]
