const marksService = require('../services/marks');
const paginationParams = require('../modules/paginationParams')


const getAll = async(req, res, next) => {
    try {
        const params = paginationParams.generate(req);
        const data = await marksService.getAll(params)
        res.status(200).json({ data })

    } catch (err) {
        next(err)
    }
}

const getById = async (req, res, next) => {
    try {
        const data = await marksService.getById(req.params.id);
        res.status(200).json({ data : data })

    } catch (err) {
        next(err)
    }
}

const create = async(req, res, next) => {
    try {
        const data = await marksService.create(req.body)
        res.status(201).json({ msg : 'category created succesfully', data })

    } catch (err) {
        next(err)
    }
}

const update = async(req, res, next) => {
    try {
        const data = await marksService.update(req.params.id, req.body);
        res.status(200).json({ msg : 'mark updated succesfully', data })
    }
    catch (err) {
        next(err)
    }
}

const remove = async(req, res, next) => {
    try {
        await marksService.remove(req.params.id)
        res.status(200).json({ msg: 'mark removed succesfully'})
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
