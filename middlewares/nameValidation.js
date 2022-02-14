const { check } = require('express-validator');
const {checkValidationResults} = require("./validation");

const validationName = check('name', 'name is required')
    .notEmpty()
    

const validationFields = [
    validationName,
    checkValidationResults
]
    
module.exports = {
    validationFields
}
