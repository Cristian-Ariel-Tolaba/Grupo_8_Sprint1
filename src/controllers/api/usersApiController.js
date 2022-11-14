const { literal } = require('sequelize');
const path = require('path');
const db = require('../../database/models');

module.exports = {
    all: async(req, res) => {
      
        try {
            let users = await db.User.findAll({
                attributes: {
                    exclude: ['avatar','rolId','password','lastname','createdAt', 'updatedAt', 'deletedAt'],
                    include: [[literal(`CONCAT('${req.protocol}://${req.get("host")}${req.baseUrl}/', id)`),'detailUrl']]
                }
            })

            if(users){
                return res.status(200).json({
                   ok: true, 
                   meta: {
                    total: users.length
                   },
                   users: users
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

    detail: async(req, res) =>{
        try{
            const {id} = req.params;
    
            let user = await db.User.findByPk(id,{
                attributes: {
                    exclude: ['password', 'rolId','createdAt', 'updatedAt', 'deletedAt'],
                    include: [[literal(`CONCAT('${req.protocol}://${req.get("host")}${req.baseUrl}/image/','default-user.png')`),'avatarUrl']]
                  
                }
            })
            if(user){
                return res.status(200).json({
                    ok: true,
                    meta: {
                      total: 1,
                    },
                    data: user
                  })
            }
            throw new Error('El usuario solicitado no existe')
    
        } catch(error) {
            return res.status(500).json({
                ok: false,
                message: error.message ? error.message : 'Si el problema persiste, comuníquese con el administrador del sitio'
            })
        }
    },

    image: (req, res)=>{
        res.sendFile(path.join(__dirname,`../../../public/images/${req.params.img}`))
    }

};