const {loadProducts, storeProducts} = require('../data/productsModule');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
    index: (req, res)=> {
        const products = loadProducts()
        //const inSale = products.filter(product => product.category === 'in-sale')
        //const visited = products.filter(product => product.category === 'visited')
        return res.render('index', {
            //inSale,
            //visited,
            //toThousand
        })
    },

};
