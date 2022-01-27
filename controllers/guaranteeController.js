const guaranteesService = require('../services/guarantees');

const getAll = async (req, res, next) => {
    try {
        const data = await guarantees.getAll();
        res.status(200).json({ data : data })

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

module.exports = {
    getAll,
    getById,
    create,
    update
}
