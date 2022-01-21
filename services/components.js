const componentsRepository = require('../repositories/components')

const getAll = async () => {
    return await componentsRepository.getAll()
}

const getById = async (id) => {
    return await componentsRepository.getById(id)
} 

module.exports = {
    getAll,
    getById
}
