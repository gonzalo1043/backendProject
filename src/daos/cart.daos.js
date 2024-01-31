import { Schema, model } from "mongoose";


const cartSchema = new Schema({
    _id: {type: String, require: true},
    products: [
        {type: Schema.Types.ObjectId, ref: 'product', queantity: Number}
    ]
},{ versionKey: false })

const cartModel = model('cart', cartSchema)

export class CartDao {

    async create(products) {
        const _id = randomUUID()
        const cart = await cartModel.create({_id, products} )
        return cart.toObject()
    }

    async readOne(id) {
        const busqueda = await cartModel.findById(id).populate('products._id').lean()
        if (!busqueda) throw new Error ('El carrito no existe')
        
        return busqueda
    }

    async readMany(criteria) {
        return await cartModel.find(criteria).lean()
    }

    async updateOne(criteria, newData) {
        const modifiedCart = await cartModel.findOneAndUpdate(
            criteria,
            newData,
            {new: true}).lean()

        if(!modifiedCart) throw new Error('NOT FOUND')
        return modifiedCart
    }

    async updateOneById(id, newData) {
        const modifiedCartById = await cartModel.findByIdAndUpdate(
            id,
            newData,
            {new: true}).lean()

        if(!modifiedCartById) throw new Error('NOT FOUND')
        return modifiedCartById
    }
}