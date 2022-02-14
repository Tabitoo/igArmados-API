var express = require('express');
const productController = require('../controllers/productController')
const upload = require('../middlewares/uploadImage')
const productValidation = require('../middlewares/products');
var router = express.Router();

router.get('/search',productController.searchProduct);
router.get('/',productController.getAll);
router.get('/:id', productController.getById);
router.get('/randomproducts/:limit', productController.getsRandomProducts);
router.post('/', productValidation.validationFields, upload.any(), productController.create);
router.put('/:id', productValidation.validationFields, upload.any(), productController.update);
router.delete('/:id',productController.remove);

module.exports = router;
