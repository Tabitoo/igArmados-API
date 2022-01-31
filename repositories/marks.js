const db = require('../database/models');

const getAll = async () => {
    return await db.Marks.findAll()
}

const getById = async (id) => {
    return await db.Marks.findByPk(id)
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
    getAll,
    getById,
    update,
    remove
}
