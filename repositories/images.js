const db = require('../database/models');

const create = async (body) => {
    try {
        return await db.Images.create(body)
    } catch (error) {
        console.log('a')
        console.log(error)
    }
    
}

const update = async (id ,body) => {
    return await db.Images.update(body, {
        where : { product_id : id }
    })
}

module.exports = {
    create,
    update
}