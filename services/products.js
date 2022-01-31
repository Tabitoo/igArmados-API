const productsRepository = require('../repositories/products')
const createError = require('http-errors');
const { paginate } = require('../modules/pagination')
const pageLimit = 10;
let paginatedResult;

const getAll = async ({baseUrl, page, categoria}) => {
    if(categoria){
        const count = await productsRepository.countByCategory();
        paginatedResult = await paginate(baseUrl, page, pageLimit,count);

        if (count > 0) {
            paginatedResult.data = await productsRepository.getAllByCategoryId(categoria ,pageLimit, paginatedResult.offset) 
        }
    } else {
        const count = await productsRepository.count();
        const paginatedResult = await paginate(baseUrl, page, pageLimit, count);
        if (count > 0) {
            paginatedResult.data = await productsRepository.getAll(pageLimit, paginatedResult.offset) 
        }
    }
    
    delete paginatedResult.offset
    return paginatedResult
}

const getById = async (id) => {
    const data = productsRepository.getById(id);
    
    if(!data) { throw createError(404, 'product not found') }

    return data
} 

const search = async (query) => {
    return await productsRepository.search(query)
}

const create = async (body) => {
    const product = {
        name : body.title,
        price : body.price,
        insale : body.insale,
        guarantee_id : body.garantia,
        component_id : body.component,
        mark_id : body.mark,
        stock : body.stock,
        description : body.description,
        features : body.features,
        model : body.model,
        category_id : body.category
    }
    if(!product) { throw createError(400) }
    return await productsRepository.create(product)
}

const update = async (id, body) => {
    const product = await productsRepository.getById(id);
    
    if(!product) {throw createError(404, 'product not found')}

    const updatedProduct = await productsRepository.update(id, body);
    
    if(updatedProduct[0] !== 1) {throw createError(400, "product could´t be updated")}
    
    return await productsRepository.getById(id)
}

const remove = async (id) => {
    const product = await productsRepository.remove(id);

    if(!product) { throw createError(404, 'product not found')}
}

module.exports = {
    getAll,
    getById,
    search,
    create,
    update,
    remove
}
