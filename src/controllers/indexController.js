const db = require('../database/models');
const {Op} = require('sequelize');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
    index: (req, res)=> {
       
        let inSale = db.Product.findAll({
            where: {
                discount: {
                    [Op.gt]:10
                }
            },
            include: ['images', 'category']
        });
        let destacados = db.Product.findAll({
            order:[
                ['createdAt', 'DESC']
            ],
            limit:4,
            include: ['images','category']
        })

        Promise.all([inSale, destacados])
            .then(([inSale, destacados])=>{
                return res.render('index',{
                    inSale, destacados, toThousand
                })
            })
            .catch(error=>console.log(error))
    },

    search: (req, res) => {
	
        const {keywords} = req.query;
        db.Product.findAll({
            where:{
                [Op.or]:[
                    {
                        name:{
                            [Op.substring]: keywords
                        }
                    },
                    {
                        description:{
                            [Op.substring]: keywords
                        }
                    }
                ]
            },
            include: ['images']
        })
        .then(products => {
            return res.render('results',{
                products,
                keywords,
                toThousand
            })
        })
        .catch(error=>console.log(error))

	}

};
