var express = require('express');
const productController = require('../controllers/productController')
var router = express.Router();

router.get('/search',productController.searchProduct);
router.get('/',productController.getAll);
router.get('/:id', productController.getById);
router.get('/randomproducts/:limit', productController.getsRandomProducts);
router.post('/', productController.create);
router.put('/:id', peoductController.update);
router.delete('/:id',removeProduct);

module.exports = router;
