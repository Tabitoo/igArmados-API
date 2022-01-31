var express = require('express');
const componentController = require('../controllers/componentController')
var router = express.Router();


router.get('/', componentController.getAll);
router.get('/:id', componentController.getById);
router.post('/', componentController.create);
router.put('/:id', componentController.update);


module.exports = router;
