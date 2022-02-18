var express = require('express');
const categoryController = require('../controllers/categoryController');
const nameValidation = require('../middlewares/nameValidation')
var router = express.Router();


router.get('/', categoryController.getAll);
router.get('/:id', categoryController.getById);
router.post('/', nameValidation.validationFields, categoryController.create);
router.put('/:id', categoryController.update);
router.delete('/:id', categoryController.remove);


module.exports = router;
