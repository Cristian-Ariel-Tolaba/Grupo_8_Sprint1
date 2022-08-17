module.exports = {
    productDetail : (req, res) => {
        return res.render('productDetail', {
            title : 'Detalle',
            stylesheets: 'productDetail.css'
            
        });
    },
    //Falta crear el controlador para el productCart
    productCart : (req, res) => {
        return res.render('productCart', {
            title : 'Carrito',
            stylesheets: 'productCart.css'
        })
    }
}