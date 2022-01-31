const productsService = require('../services/marks');
const paginationParams = require('../modules/paginationParams')

const getAll = async(res,req,next) => {
    try {
        const params = paginationParams.generate(req);
        const data = await productsService.getAll(params)
        res.status(200).json({ data })

    } catch (err) {
        next(err)
    }
} 

const getById = async(res, req, next) => {
    try{
        const data = await productsService.getById(req.params.id)
        res.status(200).json({ data })

    } catch (err) {
        next(err)
    }
}

const create = async(res, req, next) => {
    try {
        const data = await productsService.create(req.body)
        res.status(201).json({ msg : 'product created succesfully', data })

    } catch (err) {
        next(err)
    }
}

const update = async(res, req, next) => {
    try {
        const data = await productsService.update(req.params.id, req.body);
        res.status(200).json({ msg : 'product updated succesfully', data })
    }
    catch (err) {
        next(err)
    }
}

const getsRandomProducts = async(res, req, next) => {
    try {
        const data = await productsService.getsRandomProducts(req.params.limit)
        res.status(200).json({data})
    } catch (err) {
        next(err)
    }
}

const searchProduct = async(res, req, next) => {
    try {
        const data = await productsService.searchProduct(req.query.search)
        res.status(200).json({data})
    } catch (err) {
        next(err)
    }
}

const remove = async(res, req, next) => {
    try {
        await productsService.remove(req.params.id)
        res.status(200).json({ msg: 'product removed succesfully'})
    } catch (err) {
        next(err)
        
    }
}

module.exports = {
    getAll,
    getById,
    getsRandomProducts,
    searchProduct,
    create,
    update,
    remove
}
