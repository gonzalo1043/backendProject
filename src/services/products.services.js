import {randomUUID} from 'crypto'
import { productDao } from '../daos/index.js'

class ProductService {

    async readMany(query = {}) {
        return await productDao.readMany(query = {})
    }

    async readOne(id) {
        return await productDao.readOne(id)
    }

    async createProduct ({title, description, price, status, category, thumbnail, code, stock}) {
        const _id = randomUUID()
        const product = await productDao.create({_id, title, description, price, status, category, thumbnail, code, stock})
    }

    async updateProduct ({productId, prodData}) {
        const updatedProduct = await productDao.updateOneById(
            productId,
            {$set: prodData},
        )
        if(prodData.id) {
            throw new Error ('error al actualizar: no se puede cambiar el id')
        }
    }

    async deleteProduct ({productId}) {
        const deleted = await productDao.delete(productId)
    }
}


export const productService = new ProductService()
