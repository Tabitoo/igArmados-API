const db = require('../database/models');

const create = async (body) => {
    return await db.Marks.create(body)
    
}

const getAll = async (limit, offset) => {
    return await db.Marks.findAll({
        limit,
        offset
    })
}

const getById = async (id) => {
    return await db.Marks.findByPk(id)
}

const count = async () => {
    return await db.Marks.count();
}

const update = async (id, body) => {
    return await db.Marks.update(body, {
        where : {id : id}
    })
}

const remove = async (id) => {
    return await db.Marks.destroy({
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
