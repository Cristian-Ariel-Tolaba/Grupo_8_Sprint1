const db = require('../../database/models');

module.exports = {
    all : async(req, res) => {

        try {
    
            let categories = await db.Category.findAll()

            return res.status(200).json({
                ok: true,
                data: categories
            })
    

        } catch (error) {
            console.log(error);
                return res.status(500).json({
                    ok: false,
                    msg:  error.message || 'Comunicate con el adsministraador del sitio'
                })
        }
           
    }

};
