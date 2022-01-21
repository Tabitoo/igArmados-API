const categoriesRepository = require('../repositories/categories')

const getAll = async () => {
    return await categoriesRepository.getAll()
}

const getById = async (id) => {
    return await categoriesRepository.getById(id)
} 

module.exports = {
    getAll,
    getById
}
