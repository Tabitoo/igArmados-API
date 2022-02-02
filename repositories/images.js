const db = require('../database/models');

const create = async (body) => {
    try {
        return await db.Images.create(body)
    } catch (error) {
        console.log(error)
    }
    
}

const update = async (body) => {
    return await db.Images.update(body, {
        where : { id }
    })
}

module.exports = {
    create,
    update
}