var express = require('express');
const componentController = require('../controllers/componentController')
const nameValidation = require('../middlewares/nameValidation')
var router = express.Router();


router.get('/', componentController.getAll);
router.get('/:id', componentController.getById);
//router.post('/', nameValidation.validationFields, componentController.create);
router.put('/:id', componentController.update);


module.exports = router;
