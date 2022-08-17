const fs = require('fs');
const path = require('path');

const productos = require('../data/vinos.json');
const usuarios = require('../data/usuarios.json');


module.exports = {
    productDetail : (req, res) => {

        const productos = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'vinos.json')));

        const {id} = req.params;
        let producto = productos.find(producto => producto.id === +id)

        return res.render('productDetail', {
            title : 'Detalle',
            stylesheets: 'productDetail.css'
            , producto
        });
    },

    add : (req, res) => {

        return res.render('productAdd', {
            title : 'Agregar producto'
            
        });

    }
    
    ,

    //Falta crear el controlador para el productCart
    productCart : (req, res) => {
        return res.render('productCart', {
            title : 'Carrito',
            stylesheets: 'productCart.css'
        
        
        })



    }
}