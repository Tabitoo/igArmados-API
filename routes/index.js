var express = require('express');
var router = express.Router();

/* Routes. */
const categoriesRouter = require('./category')
const componentsRouter = require('./components')
const marksRouter = require('./mark')
const productsRouter = require('./products')
const guaranteeRouter = require('./guarantee')

router.use('/products',productsRouter);
router.use('/components',componentsRouter);
router.use('/categories', categoriesRouter);
router.use('/marks', marksRouter)
router.use('/guarantees',guaranteeRouter)

module.exports = router;
