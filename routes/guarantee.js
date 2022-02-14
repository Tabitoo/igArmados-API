var express = require('express');
const guaranteeController = require('../controllers/guaranteeController');
const nameValidation = require('../middlewares/nameValidation')
var router = express.Router();


router.get('/', guaranteeController.getAll);
router.get('/:id', guaranteeController.getById);
router.post('/', nameValidation.validationFields, guaranteeController.create);
router.put('/:id', guaranteeController.update);


module.exports = router;
