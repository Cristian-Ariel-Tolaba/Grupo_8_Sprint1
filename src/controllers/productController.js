const {loadProducts, storeProducts} = require('../data/productsModule');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
    index: (req, res) => {
        const products = loadProducts();
        return res.render('index', {          
            products, 
            toThousand
        })
    },

    list: (req, res) => {
        const products = loadProducts();
        return res.render('productList', {          
            products, 
            toThousand
        })
    },

    detail: (req, res) => {
        const products = loadProducts();
        const product = products.find(product => product.id === +req.params.id);
        return res.render('productDetail', {
            title: 'Detalle del producto',
            product,
            toThousand
        });
    },

    create: (req, res) => {
        return res.render('productCreateForm')
    },

    store: (req, res) => {
        const {name, price, discount, description, category} = req.body

        const products = loadProducts();
        const newProduct = {
            id: (products[products.length -1].id) + 1,
            name:name,
            description: description,
            price: +price,
            discount: +discount,
            image: req.file ? req.file.filename : 'default-image.png',
            category

        }

        const productsModify = [...products, newProduct];

        storeProducts(productsModify);
        return res.redirect('/products/list')
    },

    edit: (req, res) => {
        const products = loadProducts();
        const product = products.find(product => product.id === +req.params.id);
        return res.render('productEditForm',{
            title: 'Edicion de producto',
            product
        })
    },

    update: (req, res) => {
        const products = loadProducts();
        const {name, price, discount, category, description} = req.body;

        const productsModify = products.map(product => {
            if(product.id === +req.params.id){
                return {
                    ...product,
                    name: name,
                    price : +price,
                    discount : +discount,
                    description: description,
                    image: req.file ? req.file.filename : 'default-image.png',
                    category
                }
            }return product
        })

        storeProducts(productsModify);
        return res.redirect('/products/detail/' +req.params.id)
    },

    destroy: (req, res) => {
        const {id} = req.params;
        const products = loadProducts();

        const productsModify = products.filter(product => product.id !== +id);

        storeProducts(productsModify);
        return res.redirect('/products/list')
    },

    cart: (req, res) => {
        return res.render('productCart',{
            title : 'Mi carrito'
        })
    }
};