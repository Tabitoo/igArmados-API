const db = require("../database/models");


const getAll = async () => {
    return await db.Components.findAll()
}

const getById = async (id) => {
    return await db.Components.findByPk(id)
}

module.exports = {
    getAll,
    getById
}
