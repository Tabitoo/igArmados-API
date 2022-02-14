var express = require('express');
const markComponent = require('../controllers/markComponent');
const nameValidation = require('../middlewares/nameValidation')
var router = express.Router();


router.get('/', markComponent.getAll);
router.get('/:id', markComponent.getById);
router.post('/', nameValidation.validationFields, markComponent.create);
router.put('/:id', markComponent.update);


module.exports = router;
