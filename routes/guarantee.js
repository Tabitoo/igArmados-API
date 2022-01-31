var express = require('express');
const guaranteeController = require('../controllers/guaranteeController');
var router = express.Router();


router.get('/', guaranteeController.getAll);
router.get('/:id', guaranteeController.getById);
router.post('/', guaranteeController.create);
router.put('/:id', guaranteeController.update);


module.exports = router;
