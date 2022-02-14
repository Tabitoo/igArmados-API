var express = require('express');
const categoryController = require('../controllers/categoryController');
const nameValidation = require('../middlewares/nameValidation')
var router = express.Router();


router.get('/', nameValidation.validationFields, categoryController.getAll);
router.get('/:id', categoryController.getById);
router.post('/', categoryController.create);
router.put('/:id', categoryController.update);


module.exports = router;
