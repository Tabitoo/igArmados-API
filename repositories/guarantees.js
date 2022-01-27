const db = require('../database/models');

const create = async (body) => {
    return await db.Guarantees.create(body)
    
}

const getAll = async () => {
    return await db.Guarantees.findAll()
}

const getById = async (id) => {
    return await db.Guarantees.findByPk(id)
}

const update = async (id, body) => {
    return await db.Guarantees.update(body, {
        where : {id : id}
    })
}

module.exports = {
    create,
    getAll,
    getById,
    update
}
