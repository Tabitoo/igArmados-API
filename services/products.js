const productsRepository = require('../repositories/products');
const imagesRepository = require('../repositories/images');
const marksRepository = require('../repositories/marks');
const componentsRepository = require('../repositories/components');
const categoriesRepository = require('../repositories/categories');
const guaranteesRepository = require('../repositories/guarantees')
const createError = require('http-errors');
const { paginate } = require('../modules/pagination')
const cloudinary = require('../modules/cloudUpload');
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

const create = async (body, filePath) => {

    const product = {
        name : body.name,
        price : Number(body.price),
        insale : Number(body.insale),
        guarantee_id : Number(body.guarantee_id),
        component_id : Number(body.component_id),
        mark_id : Number(body.mark_id),
        stock : Number(body.stock),
        description : body.description,
        features : body.features,
        model : body.model,
        category_id : Number(body.category_id)
    }

    const component = await componentsRepository.getById(product.component_id);
    const guarantee = await guaranteesRepository.getById(product.guarantee_id);
    const mark = await marksRepository.getById(product.mark_id);
    const category = await categoriesRepository.getById(product.category_id);

    if(!component) {throw createError(404, 'component not found')}
    if(!guarantee) {throw createError(404, 'guarantee not found')}
    if(!mark) {throw createError(404, 'mark not found')}
    if(!category) {throw createError(404, 'category not found')}

    const newProduct = await productsRepository.create(product)

    if(!newProduct) { throw createError(400) }

    const uploadedFile = await cloudinary.v2.uploader.upload(filePath)

    await imagesRepository.create({ name : uploadedFile.url, product_id : newProduct.id })

    newProduct.dataValues['imageUrl'] = uploadedFile.url
    
    return newProduct
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
