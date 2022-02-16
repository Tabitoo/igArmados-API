const componentsRepository = require('../repositories/components')
const createError = require('http-errors')
const { paginate } = require('../modules/pagination')

const pageLimit = 10;


const getAll = async ({baseUrl, page}) => {
    const count = await componentsRepository.count();
    const paginatedResult = await paginate(baseUrl, page, pageLimit, count);
    if (count > 0) {
        paginatedResult.data = await componentsRepository.getAll(pageLimit, paginatedResult.offset) 
    }

    delete paginatedResult.offset
    return paginatedResult
}

const getById = async (id) => {
    return await componentsRepository.getById(id)
}

const create = async (body) => {
    const data = componentsRepository.create(body)

    if(!data) { throw createError(400) }

    return data

}

const update = async (id, body) => {
    const component = await componentsRepository.getById(id)

    if(!component) { throw createError(404, 'component not found') }

    const updatedComponent =  await componentsRepository.update(id, body)

    if(updatedComponent[0] !== 1) { throw createError(400, "component could't be updated") }

    return await componentsRepository.getById(id)
}

const remove = async (id) => {
    const category = await categoriesRepository.remove(id);

    if(!category) { throw createError(404, 'category not found')}
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}
