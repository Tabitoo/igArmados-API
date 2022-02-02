const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination : path.join(__dirname, 'public/uploads'),
    filename : (req, file, cb) => {
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    fileFilter : (req, file, cb) => {
        if(file.mimetype == 'image/jpg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpeg'){
            return cb(null, true)
        } else {
            return cb(new Error('Invalid format'))
        }
    }
})

module.exports = upload;