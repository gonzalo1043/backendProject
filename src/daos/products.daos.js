import { Schema, model } from "mongoose";
import { randomUUID } from "crypto";


const productSchema = new Schema({
    _id: {type: String, required: true, default: randomUUID},
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    status: {type: String, required: true},
    category: {type: String, required: true},
    thumbnail: {type: String},
    code: {type: String, required: true, unique: true},
    stock: {type: String, required: true},
},{ versionKey: false })

const productModel = model('product', productSchema)

export class ProductDao {

    async readMany(query = {}) {
        const opcionesDePaginacion = {
            limit: query.limit || 10,
            page: query.page || 1
        }

        if(!query.category && !query.sort && !query.stock) {
            return await productModel.paginate({}, opcionesDePaginacion)
        }

        if (query.category) {
            const criterioDeBusqueda = {category: query.category}
            return await productModel.paginate(criterioDeBusqueda, opcionesDePaginacion)
        }
        if(query.stock) {
            const criterioDeBusqueda = {stock: query.stock}
            return await productModel.paginate(criterioDeBusqueda, opcionesDePaginacion)
        }
        if (query.sort) {
            return await productModel.aggregate([
                {$sort: {price: -1}}
            ])
        }
    }

    async readOne(id) {
        const product = await productModel.findById(id).lean()
        if (!product) throw new Error ('El producto no existe')
        return product
    }

    async create({title, description, price, status, category, thumbnail, code, stock}) {
        const _id = randomUUID()
        const product = await productModel.create({_id, title, description, price, status, category, thumbnail, code, stock})
        return product.toObject()
    }

    async updateOneById(id, newData) {
        const modifiedProd = await productModel.findByIdAndUpdate(
            id,
            newData,
            {new: true}).lean()

        if(!modifiedProd) throw new Error('NOT FOUND')
        return modifiedProd
    }

    async delete ({id}) {
        const deleted = await productModel.findByIdAndDelete(id).lean()
        if(!deleted) {
            throw new Error ('error al borrar: producto no encontrado')
        }
        return deleted
    }
}