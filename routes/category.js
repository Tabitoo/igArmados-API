var express = require('express');
const categoryController = require('../controllers/categoryController');
var router = express.Router();


router.get('/',categoryController.getAll);
router.get('/:id', categoryController.getById);
router.post('/', categoryController.create);
router.put('/:id', categoryController.update);


module.exports = router;
