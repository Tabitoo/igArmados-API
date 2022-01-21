const categoriesService = require('../services/categories');

const getAll = async (req, res, next) => {
    try {
        const data = await categoriesService.getAll();
        res.status(200).json({ data : data })

    } catch (err) {
        next(err)
    }
}

const getById = async (req, res, next) => {
    try {
        const data = await categoriesService.getById(req.params.id);
        res.status(200).json({ data : data })

    } catch (err) {
        next(err)
    }
}

module.exports = {
    getAll,
    getById
}
