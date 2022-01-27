const marksRepository = require('../repositories/marks')
const createError = require('http-errors')


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

const getAll = async () => {
    return await marksRepository.getAll()
}

const getById = async (id) => {
    const mark = marksRepository.getById(id)

    if(!mark) { throw createError(404, 'mark not found') }
    
    return mark
} 

module.exports = {
    create,
    getAll,
    getById,
    update
}

