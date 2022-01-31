const db = require('../database/models');

const create = async (body) => {
    return await db.Guarantees.create(body)
    
}

const getAll = async (limit, offset) => {
    return await db.Guarantees.findAll({
        limit,
        offset
    })
}

const getById = async (id) => {
    return await db.Guarantees.findByPk(id)
}

const count = async () => {
    return await db.Guarantees.count();
}

const update = async (id, body) => {
    return await db.Guarantees.update(body, {
        where : {id : id}
    })
}

const remove = async (id) => {
    return await db.Guarantees.destroy({
        where : { id }
    })
}

module.exports = {
    create,
    getAll,
    getById,
    count,
    update,
    remove
}
