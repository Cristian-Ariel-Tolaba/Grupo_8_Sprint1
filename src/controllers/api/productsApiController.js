const db = require('../../database/models');
const { literal } = require('sequelize');
const path = require('path');

module.exports = {
    all: async(req, res) => {

        try {
    
            let products = await db.Product.findAll({
                
                attributes: {
                    exclude: ['price','discount','createdAt', 'updatedAt', 'deletedAt'],
                    include: [[literal(`CONCAT('${req.protocol}://${req.get("host")}${req.baseUrl}/', id)`),'detailUrl']]
                    
                }
            })
        
            if(products){
                return res.status(200).json({
                    ok: true, 
                    meta: {
                        totalProducts: products.length,
                
                    },
                    data: products        
                    
                 });
            }
            throw new Error({
                ok: false,
                message: 'Hubo un error'
            });

        } catch (error) {
            console.log(error);
                return res.status(500).json({
                    ok: false,
                    message: error.message ? error.message : 'Si el problema persiste, comuníquese con el administrador del sitio'
                })
        }
           
    },

    detail: async(req, res) => {
        try{

            let options = {
                include:[
                  
                    {
                        association: 'images',
                        attributes: {
                            exclude: ['createdAt', 'updatedAt', 'deletedAt'],
                            include: [[literal(`CONCAT('${req.protocol}://${req.get("host")}${req.baseUrl}/images/', file)`),'fileUrl']]

                        }
                    },
                    {
                        association: 'category',
                        attributes: {
                            exclude: ['createdAt', 'updatedAt', 'deletedAt']

                        }
                    }
                ],
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'deletedAt']
                    
                }
            }
            const idProduct = req.params.id;

            if (isNaN(idProduct)) {
                return res.json("El parámetro es inválido, asegúrese de escribir correctamente");
              }
    
            let product = await db.Product.findByPk(idProduct, options);

            if(!product){
                return res.json('El producto solicitado no existe')
            }
                return res.status(200).json({
                    ok: true,
                    meta: {
                      total: 1,
                    },
                    data: product
                    
                  })
    
        } catch(error) {
            return res.status(500).json({
                ok: false,
                message: error.message ? error.message : 'Si el problema persiste, comuníquese con el administrador del sitio'
            })
        }
 
    },
    images: (req, res) =>{
        
        res.sendFile(path.join(__dirname,`../../../public/images/${req.params.image}`))
        
    }
};
