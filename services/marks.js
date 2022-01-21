const marksRepository = require('../repositories/marks')

const getAll = async () => {
    return await marksRepository.getAll()
}

const getById = async (id) => {
    return await marksRepository.getById(id)
} 

module.exports = {
    getAll,
    getById
}
