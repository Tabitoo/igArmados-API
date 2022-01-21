var express = require('express');
const { getProducts, getOneProduct, createProduct, editProduct, removeProduct, getsRandomProducts, searchProduct, productList,getProductsBycategory  } = require('../controllers/productController')
var router = express.Router();

router.get('/productlist',productList)
router.get('/busqueda',searchProduct)
router.get('/all',getProducts);
router.get('/category/:id',getProductsBycategory )
router.get('/:id', getOneProduct);
router.get('/randomproducts/:limit',getsRandomProducts);
router.post('/create',createProduct);
router.put('/edit/:id', editProduct);
router.delete('/delete/:id',removeProduct);

module.exports = router;
