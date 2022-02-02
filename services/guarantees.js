const guaranteesRepository = require('../repositories/guarantees')
const createError = require('http-errors')

const getAll = async () => {
    const count = await guaranteesRepository.count();
    const paginatedResult = await paginate(baseUrl, page, pageLimit, count);
    if (count > 0) {
        paginatedResult.data = await guaranteesRepository.getAll(pageLimit, paginatedResult.offset) 
    }

    delete paginatedResult.offset
    return paginatedResult
}

const getById = async (id) => {
    const guarantee = await guaranteesRepository.getById(id)

    if(!guarantee) { throw createError(404, 'guarantee not found') }
    
    return mark
}

const create = async (body) => {
    const data = await guaranteesRepository.create(body)

    if(!data) { throw createError(400) }

    return data

}

const update = async (id, body) => {
    const guarantee = await guaranteesRepository.getById(id)

    if(!guarantee) { throw createError(404, 'guarantee not found') }

    const updatedGuarantee =  await guaranteesRepository.update(id, body)

    if(updatedGuarantee[0] !== 1) { throw createError(400, "Guarantee could't be updated") }

    return await guaranteesRepository.getById(id)
}

const remove = async (id) => {
    const guarantee = await guaranteesRepository.remove(id);

    if(!guarantee) { throw createError(404, 'guarantee not found')}
}

module.exports = {
    create,
    getAll,
    getById,
    update,
    remove
}
