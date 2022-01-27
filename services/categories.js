const createError = require('http-errors')
const categoriesRepository = require('../repositories/categories')


const create = async (body) => {
    const data = categoriesRepository.create(body)

    if(!data) { throw createError(400) }

    return data

}

const update = async (id, body) => {
    const category = categoriesRepository.getById(id)

    if(!category) { throw createError(404, 'category not found') }

    const updatedCategory =  await categoriesRepository.update(id, body)

    if(updatedCategory[0] !== 1) { throw createError(400, "category could't be updated") }

    return await categoriesRepository.getById(id)
}

const getAll = async () => {
    return await categoriesRepository.getAll()
}

const getById = async (id) => {
    const category = categoriesRepository.getById(id)

    if(!category) { throw createError(404, 'category not found') }
    
    return category
} 

module.exports = {
    create,
    getAll,
    getById,
    update
}
