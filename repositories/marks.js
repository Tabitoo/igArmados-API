const db = require('../database/models');

const getAll = async () => {
    return await db.Marks.findAll()
}

const getById = async (id) => {
    return await db.Marks.findByPk(id)
}

module.exports = {
    getAll,
    getById
}
