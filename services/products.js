const productsRepository = require('../repositories/products');
const imagesRepository = require('../repositories/images');
const marksRepository = require('../repositories/marks');
const componentsRepository = require('../repositories/components');
const categoriesRepository = require('../repositories/categories');
const guaranteesRepository = require('../repositories/guarantees')
const createError = require('http-errors');
const { paginate } = require('../modules/pagination')
const cloudinary = require('../modules/cloudUpload');
const fs = require('fs')
const pageLimit = 10;


const getAll = async ({baseUrl, page, categoria}) => {
    let paginatedResult;

    if(categoria){
        const count = await productsRepository.countByCategory();
        paginatedResult = await paginate(baseUrl, page, pageLimit,count);

        if (count > 0) {
            paginatedResult.data = await productsRepository.getAllByCategoryId(categoria ,pageLimit, paginatedResult.offset) 
            console.log('paginatedResult desde el service', paginatedResult)
        }
    } else {
        const count = await productsRepository.count();
        paginatedResult = await paginate(baseUrl, page, pageLimit, count);
        if (count > 0) {
            paginatedResult.data = await productsRepository.getAll(pageLimit, paginatedResult.offset)             
        }
    }

    delete paginatedResult.offset
    return paginatedResult
}

const getById = async (id) => {
    const data = await productsRepository.getById(id);

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
    if(!component) {throw createError(404, 'component not found')}

    const guarantee = await guaranteesRepository.getById(product.guarantee_id);
    if(!guarantee) {throw createError(404, 'guarantee not found')}

    const mark = await marksRepository.getById(product.mark_id);
    if(!mark) {throw createError(404, 'mark not found')}

    const category = await categoriesRepository.getById(product.category_id);
    if(!category) {throw createError(404, 'category not found')}


    const newProduct = await productsRepository.create(product)

    if(!newProduct) { throw createError(400) }

    const uploadedFile = await cloudinary.v2.uploader.upload(filePath)

    fs.unlink(filePath, (err) => {
        if(err) console.log(err)
    })
    /*
    let image = {
        name : uploadedFile.url,
        product_id : newProduct.id

    }*/

    await imagesRepository.create({name :uploadedFile.url, product_id : newProduct.id})

    newProduct.dataValues['imageUrl'] = uploadedFile.url

    return newProduct
}

const update = async (id, body, filePath = null) => {

    const productToUpdate = {
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

    console.log('Body', productToUpdate)

    const product = await productsRepository.getById(id);
    if(!product) {throw createError(404, 'product not found')}

    const component = productToUpdate.component_id == product.component_id ? true : await componentsRepository.getById(product.component_id);
    if(!component) {throw createError(404, 'component not found')}

    const guarantee = productToUpdate.guarantee_id == product.guarantee_id ? true : await guaranteesRepository.getById(product.guarantee_id);
    if(!guarantee) {throw createError(404, 'guarantee not found')}

    const mark = productToUpdate.mark_id == product.mark_id ? true : await marksRepository.getById(product.mark_id);
    if(!mark) {throw createError(404, 'mark not found')}

    const category = productToUpdate.category_id == product.category_id ? true : await categoriesRepository.getById(product.category_id);
    if(!category) {throw createError(404, 'category not found')}
    

    const updatedProduct = await productsRepository.update(id, productToUpdate);
    
    if(updatedProduct[0] !== 1) {throw createError(400, "product could´t be updated")}

    if(filePath){
        
        const uploadedFile = await cloudinary.v2.uploader.upload(filePath)

        await imagesRepository.update(id, { name : uploadedFile.url, product_id : id })

        
        fs.unlink(filePath, (err) => {
            if(err) console.log(err)
        })
    }

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
