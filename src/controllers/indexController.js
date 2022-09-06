const {loadProducts, storeProducts} = require('../data/productsModule');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
    index: (req, res)=> {
        const products = loadProducts()
        const inSale = products.filter(product => product.category === 'in-sale')
        const destacados = products.filter(product => product.category === 'destacados')
        return res.render('index', {
            inSale,
            destacados,
            toThousand
        })
    },

    search: (req, res) => {
	
		const products = loadProducts();
		const result = products.filter(product => product.name.toLowerCase().includes(req.query.keywords.toLowerCase()));

		return res.render('results',{
			products : result,
			keywords : req.query.keywords,
			toThousand
		})
	}

};
