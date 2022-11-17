const db = require('../database/models');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const {validationResult} = require('express-validator');


module.exports = {
    index: (req, res) => {
        db.Product.findAll({include: ['images']})
            .then(products=>{
                return res.render('products',{
                    products, toThousand
                })
            })
            .catch(error=>console.log(error))
    },

    list: (req, res) => {
        db.Product.findAll({include: ['images']})
            .then(products=>{
                return res.render('productList',{
                    products, toThousand
                })
            })
            .catch(error=>console.log(error))
    },

    detail: (req, res) => {
        db.Product.findByPk(req.params.id,{
            include: ['images']
        })
        .then(product=> res.render('productDetail',{
            title: 'Detalle del producto', product, toThousand
        }))
        .catch(error=>console.log(error))
    },

    create: (req, res) => {
        
        db.Category.findAll({
            attributes: ['id','name'],
            order: ['name']
        })
            .then(categories=>{
                return res.render('productCreateForm',{
                    categories
                })
            })
            .catch(error=>console.log(error))
    },

    store: (req, res) => {
       
        let errors = validationResult(req);
        //return res.send(errors);  ***consultar***

        if(errors.isEmpty()){
            db.Product.create({
                ...req.body,
                name: req.body.name.trim(),           
                description: req.body.description.trim()
                
            })
            .then(
                product => {
                 if(req.files){
                    let images = req.files.map(({filename})=>{
                        return {
                            file: filename,
                            productId: product.id
                        }
                    })
                    db.Image.bulkCreate(images,{
                        validate: true
                    }).then((result)=>console.log(result))
                } 
                
                return res.redirect('/products/list')
                
            })
            .catch(error=>console.log(error))
        }else{
            res.render('productCreateForm',{
                errors : errors.mapped(),
                old : req.body
            })   
        }

    },

    edit: (req, res) => {

        let product = db.Product.findByPk(req.params.id,{
            include: [{association: 'category'}]
        });

        let categories = db.Category.findAll({
            attributes: ['id', 'name']
        });
       
        Promise.all([categories, product])
            .then(([categories, product])=>{
                return res.render('productEditForm',{
                    product, categories
                })
            })
            .catch(error => console.log(error));
    },

    update: (req, res) => {
      
        let errors = validationResult(req);
        //return res.send(errors);  ***consultar***

        if(errors.isEmpty()){

            db.Product.update(
                {
                    ...req.body,
                    name: req.body.name.trim(),
                    description: req.body.description.trim()
                },
                {
                    where: {id: req.params.id}
                }
            )
            .then(()=> res.redirect('/products/detail/' + req.params.id))
            .catch(error => console.log(error))

        }else{
            res.render('productEditForm',{
                errors : errors.mapped()
            })
        }
        
    },

    destroy: (req, res) => {
        db.Product.destroy({
            where:
                {
                    id: req.params.id
                }
            })
            .then(()=>res.redirect('/products/list'))
            .catch(error=> console.log(error))
    },

    cart: (req, res) => {
        db.Product.findAll()
            .then(()=>{
                return res.render('productCart',{
                    title : 'Mi carrito'
                })
            })
            .catch(error => console.log(error))
    }
};
