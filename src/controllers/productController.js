module.exports = {
    productDetail : (req, res) => {
        return res.render('productDetail', {
            title : 'Detalle',
            stylesheets: 'productDetail.css'
            
        });
    },
    productCart : (req, res) => {
        return res.render('productCart', {
            title : 'Carrito',
            stylesheets: 'productCart.css'
        })
    }
}