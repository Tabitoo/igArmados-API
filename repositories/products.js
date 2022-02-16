const db = require('../database/models');

const getAll = async (limit, offset) => {
    return await db.Products.findAll({
        limit,
        offset,
        include: [{association: 'imagenes'}, {association: 'categoria'}]
    })
}

const getAllByCategoryId = async (id, limit, offset) => {
    return await db.Products.findAll({
        limit,
        offset,
        include: [{association: 'imagenes'}, {association: 'categorias'}],
        where : {
            category_id : id
        }
    })
}

const getById = async (id) => {
    return await db.Products.findByPk(id, {
        include : [
            { association: 'categoria'},
            { association: 'componente'},
            { association: "marca"},
            { association: "imagenes"},
            { association: "garantia"} 
        ]
    })
}

const search = async (value) => {
    return await db.Products.findAll({
        where : {
            name : {
                [Op.like] : `%${value}%`}
            },
        include : [{association : 'imagenes'}]
    })
}

const getsRandomProducts = async (limit) => {
    return await db.Products.findAll({
        include: [
            { association: 'imagenes' },  
            { association: 'categoria' },
        ],
        order: sequelize.random(),
        limit: Number(limit)
    })
}

const count = async () => {
    return await db.Products.count();
}

const countByCategory = async (id) => {
    return await db.Products.count({ where : { category_id : id } })
}

const create = async (body) => {
    return await db.Products.create(body)
}

const update = async (id, body) => {
    return await db.Products.update(body, { where: { id } })
}

const remove = async (id) => {
    return await db.Products.destroy({
        where : { id }
    })
}

module.exports = {
    getAll,
    getAllByCategoryId,
    getsRandomProducts,
    getById,
    search,
    create,
    update,
    remove,
    count,
    countByCategory
}   
    
