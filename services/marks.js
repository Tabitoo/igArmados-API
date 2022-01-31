const marksRepository = require('../repositories/marks')
const createError = require('http-errors')

const getAll = async () => {
    const count = await marksRepository.count();
    const paginatedResult = await paginate(baseUrl, page, pageLimit, count);
    if (count > 0) {
        paginatedResult.data = await marksRepository.getAll(pageLimit, paginatedResult.offset) 
    }

    delete paginatedResult.offset
    return paginatedResult
}

const getById = async (id) => {
    const mark = marksRepository.getById(id)

    if(!mark) { throw createError(404, 'mark not found') }
    
    return mark
}

const create = async (body) => {
    const data = marksRepository.create(body)

    if(!data) { throw createError(400) }

    return data

}

const update = async (id, body) => {
    const mark = marksRepository.getById(id)

    if(!mark) { throw createError(404, 'mark not found') }

    const updatedMark =  await marksRepository.update(id, body)

    if(updatedMark[0] !== 1) { throw createError(400, "Mark could't be updated") }

    return await marksRepository.getById(id)
}

const remove = async (id) => {
    const mark = await marksRepository.remove(id);

    if(!mark) { throw createError(404, 'mark not found')}
}

module.exports = {
    create,
    getAll,
    getById,
    update,
    remove
}

