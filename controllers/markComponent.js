const marksService = require('../services/marks');

const getAll = async(res,req,next) => {
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

module.exports = {
    getAll,
    getById
}
