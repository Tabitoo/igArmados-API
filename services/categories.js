const createError = require('http-errors')
const categoriesRepository = require('../repositories/categories')

const getAll = async () => {
    const count = await categoriesRepository.count();
    const paginatedResult = await paginate(baseUrl, page, pageLimit, count);
    if (count > 0) {
        paginatedResult.data = await categoriesRepository.getAll(pageLimit, paginatedResult.offset) 
    }

    delete paginatedResult.offset
    return paginatedResult
}

const getById = async (id) => {
    const category = categoriesRepository.getById(id)

    if(!category) { throw createError(404, 'category not found') }
    
    return category
} 

const create = async (body) => {
    const data = categoriesRepository.create(body)

    if(!data) { throw createError(400) }

    return data

}

const update = async (id, body) => {
    const category = await categoriesRepository.getById(id)

    if(!category) { throw createError(404, 'category not found') }

    const updatedCategory =  await categoriesRepository.update(id, body)

    if(updatedCategory[0] !== 1) { throw createError(400, "category could't be updated") }

    return await categoriesRepository.getById(id)
}

const remove = async (id) => {
    const category = await categoriesRepository.remove(id);

    if(!category) { throw createError(404, 'category not found')}
}


module.exports = {
    create,
    getAll,
    getById,
    update,
    remove
}
