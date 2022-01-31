var express = require('express');
var router = express.Router();

/* Routes. */
const categoriesRouter = require('./category')
const componentsRouter = require('./components')
const marksRouter = require('./mark')
const productsRouter = require('./products')

app.use('/products',productsRouter);
app.use('/components',componentsRouter);
app.use('/categories', categoriesRouter);
app.use('/marks', marksRouter)
app.use('/guarantees',guaranteeRouter)

module.exports = router;
