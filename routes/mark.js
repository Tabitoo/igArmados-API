var express = require('express');
const markController = require('../controllers/markController');
const nameValidation = require('../middlewares/nameValidation')
var router = express.Router();


router.get('/', markController.getAll);
router.get('/:id', markController.getById);
router.post('/', nameValidation.validationFields, markController.create);
router.put('/:id', markController.update);
router.delete('/:id',markController.remove);


module.exports = router;
