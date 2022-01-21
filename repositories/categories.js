const db = require('../database/models');

const getAll = async () => {
    return await db.Categorys.findAll()
}

const getById = async (id) => {
    return await db.Categorys.findByPk(id)
}

module.exports = {
    getAll,
    getById
}
