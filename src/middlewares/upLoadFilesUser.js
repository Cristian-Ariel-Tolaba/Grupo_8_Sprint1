const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination : (req, file, cb)=>{
        cb(null, path.join(__dirname, '../../public/images'))
    },
    filename : (req, file, cb)=>{
        console.log(file);
        const newFilename = 'user-' + Date.now() + path.extname(file.originalname) ;
        cb(null, newFilename);
    }

});

const uploadUser= multer({storage});

module.exports = uploadUser;