const { check } = require('express-validator');
const {checkValidationResults} = require("./validation");

const validationName = check('name', 'name is required')
    .notEmpty()
    .isLength({
        min : 5
    })
    .withMessage('name must be at least 5 characters long')

const validationPrice = check('price', 'price is required')
    .notEmpty()
    .isNumeric()
    .withMessage('price must be a integer')

const validationInsale = check('insale', 'insale must be not empty')
    .notEmpty()
    .isNumeric()
    .withMessage('insale must be a valid integer')

const validationDescription = check('description', 'description is required')
    .notEmpty()

const validationFeatures = check('features', 'features is required')
    .notEmpty()

const validationModel = check('model', 'model is required')
.notEmpty()

const validationFields = [
    validationName,
    validationPrice,
    validationInsale,
    validationDescription,
    validationFeatures,
    validationModel,
    checkValidationResults
]

module.exports = {
    validationFields
}