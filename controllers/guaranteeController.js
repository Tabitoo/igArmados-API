const guaranteesService = require('../services/guarantees');

const getAll = async(res,req,next) => {
    try {
        const params = paginationParams.generate(req);
        const data = await guaranteesService.getAll(params)
        res.status(200).json({ data })

    } catch (err) {
        next(err)
    }
}

const getById = async (req, res, next) => {
    try {
        const data = await guaranteesService.getById(req.params.id);
        res.status(200).json({ data : data })

    } catch (err) {
        next(err)
    }
}

const create = async(res, req, next) => {
    try {
        const data = await guaranteesService.create(req.body)
        res.status(201).json({ msg : 'guarantee created succesfully', data })

    } catch (err) {
        next(err)
    }
}

const update = async(res, req, next) => {
    try {
        const data = await guaranteesService.update(req.params.id, req.body);
        res.status(200).json({ msg : 'guarantee updated succesfully', data })
    }
    catch (err) {
        next(err)
    }
}

const remove = async(res, req, next) => {
    try {
        await guaranteesService.remove(req.params.id)
        res.status(200).json({ msg: 'guarantee removed succesfully'})
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
