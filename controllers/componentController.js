const componentsService = require('../services/components');

const getAll = async(res,req,next) => {
    try {
        const params = paginationParams.generate(req);
        const data = await componentsService.getAll(params)
        res.status(200).json({ data })

    } catch (err) {
        next(err)
    }
}

const getById = async (req, res, next) => {
    try {
        const data = await componentsService.getById(req.params.id);
        res.status(200).json({ data : data })

    } catch (err) {
        next(err)
    }
}

const create = async(res, req, next) => {
    try {
        const data = await componentsService.create(req.body)
        res.status(201).json({ msg : 'component created succesfully', data })

    } catch (err) {
        next(err)
    }
}

const update = async(res, req, next) => {
    try {
        const data = await componentsService.update(req.params.id, req.body);
        res.status(200).json({ msg : 'component updated succesfully', data })
    }
    catch (err) {
        next(err)
    }
}

const remove = async(res, req, next) => {
    try {
        await componentsService.remove(req.params.id)
        res.status(200).json({ msg: 'component removed succesfully'})
    } catch (err) {
        next(err)
        
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}
