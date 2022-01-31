const db = require('../database/models');

const create = async (body) => {
    return await db.Categorys.create(body)
    
}

const getAll = async (limit, offset) => {
    return await db.Categorys.findAll({
        limit,
        offset
    })
}

const getById = async (id) => {
    return await db.Categorys.findByPk(id)
}

const update = async (id, body) => {
    return await db.Categorys.update(body, {
        where : {id : id}
    })
}

const remove = async (id) => {
    return await db.Categorys.destroy({
        where : { id }
    })
}

module.exports = {
    create,
    getAll,
    getById,
    update,
    remove
}
