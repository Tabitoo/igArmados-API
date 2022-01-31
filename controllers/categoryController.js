const categoriesService = require('../services/categories');

const getAll = async(res,req,next) => {
    try {
        const params = paginationParams.generate(req);
        const data = await categoriesService.getAll(params)
        res.status(200).json({ data })

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

const update = async(res, req, next) => {
    try {
        const data = await categoriesService.update(req.params.id, req.body);
        res.status(200).json({ msg : 'category updated succesfully', data })
    }
    catch (err) {
        next(err)
    }
}

const remove = async(res, req, next) => {
    try {
        await categoriesService.remove(req.params.id)
        res.status(200).json({ msg: 'category removed succesfully'})
    } catch (err) {
        next(err)
        
    }
}

module.exports = {
    getAll,
    getById,
    update,
    remove
}
