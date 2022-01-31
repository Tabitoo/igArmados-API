const db = require("../database/models");


const getAll = async () => {
    return await db.Components.findAll()
}

const getById = async (id) => {
    return await db.Components.findByPk(id)
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
    getAll,
    getById,
    update,
    remove
}
