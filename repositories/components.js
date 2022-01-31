const db = require("../database/models");

const create = async (body) => {
    return await db.Components.create(body)
}

const getAll = async (limit, offset) => {
    return await db.Components.findAll({
        limit,
        offset
    })
}

const getById = async (id) => {
    return await db.Components.findByPk(id)
}

const count = async () => {
    return await db.Components.count();
}

const update = async (id, body) => {
    return await db.Components.update(body, {
        where : { id }
    })
}

const remove = async (id) => {
    return await db.Components.destroy({
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
