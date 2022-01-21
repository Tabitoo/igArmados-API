const productsRepository = require('../repositories/products')
const { paginate } = require('../modules/pagination')
const pageLimit = 10;
let paginatedResult;

const getAll = async ({baseUrl, page, categoryId}) => {
    if(categoryId){
        const count = await productsRepository.countByCategory();
        paginatedResult = await paginate(baseUrl, page, pageLimit,count);

        if (count > 0) {
            paginatedResult.data = await productsRepository.getAllByCategoryId(pageLimit, paginatedResult.offset) 
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
    return await productsRepository.getById(id)
} 

const search = async (query) => {
    return await productsRepository.search(query)
}

const update = async (id, body) => {
    return await productsRepository.update(id, body)
}

module.exports = {
    getAll,
    getById,
    search,
    update
}
