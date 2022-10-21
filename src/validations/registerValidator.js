const {check, body} = require('express-validator');
const users = require('../data/usersModule').loadUsers();


module.exports = [
    check('firstname')
        .notEmpty().withMessage('Debes completar el nombre').bail()
        .isLength({min: 3}).withMessage('El nombre debe tener al menos 3 caracteres'),
    check('lastname')
        .notEmpty().withMessage('Debes completar el apellido').bail()
        .isLength({min: 3}).withMessage('El apellido debe tener al menos 3 caracteres'),
    body('email')
        .notEmpty().withMessage('Debes completar el email').bail()
        .isEmail().withMessage('Debes ingresar un email válido').bail()
        .custom((value, {req})=> {
            let user = users.find(user => user.email === value.trim());
            if(user){
                return false
            }else{
                return true
            }
        }).withMessage('El email ya se encuentra registrado'),
    check('password')
        .notEmpty().withMessage('Debes ingresar una contraseña').bail()
        .isLength({min: 8}).withMessage('La contraseña debe tener al menos 8 caracteres'),
    body('password2')
        .notEmpty().withMessage('Debes confirmar tu contraseña').bail()

        .custom((value, {req})=> {
            if(value !== req.body.password){
                return false
            }else{
                return true
            }
        }).withMessage('Las contraseñas no coinciden')

]