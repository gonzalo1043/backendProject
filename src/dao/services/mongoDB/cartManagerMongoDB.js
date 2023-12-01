import {randomUUID} from 'crypto'
import { Cart } from '../../models/CartMongoose.js'
import { Product } from '../../models/productMongoose.js'



export class CartManagerMongoDB {

    async addCart(products) {
        const _id = randomUUID()
        const cart = await Cart.create({_id, products} )
        return cart.toObject()
    }

    async getCartById (id) {
        const busqueda = await Cart.findById(id).lean()
        if (!busqueda) throw new Error ('El carrito no existe')
        return busqueda
    }

    async addProductToCart(cartId, productId) {
        const cartBuscado =  await Cart.findById(cartId).lean()
        const productBuscado = await Product.findById(productId).lean()
        
        if (!cartBuscado) throw new Error ('El carrito no existe')
        if (!productBuscado) throw new Error ('El carrito no existe')

        const productCart = cartBuscado.products.find(p => p._id === productId)

        console.log(productCart)

        await Cart.findByIdAndUpdate(cartId, {
            $push: {products: {_id: productId}}
        }, {new: true} )

        return cartBuscado
    }

    async deleteCart(id) {
        const borrada = await Cart.findByIdAndDelete(id).lean()
        if(!borrada) {
            throw new Error ('error al borrar: producto no encontrado')
        }
        return borrada
    }
}


