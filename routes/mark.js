var express = require('express');
const markComponent = require('../controllers/markComponent');
var router = express.Router();


router.get('/', markComponent.getAll);
router.get('/:id', markComponent.getById);
router.post('/',markComponent.create);
router.put('/:id', markComponent.update);


module.exports = router;
