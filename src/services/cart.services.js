import {randomUUID} from 'crypto'
import { cartDao, productDao } from '../daos/index'

class CartService {
    async readOne(criteria) {
        return await cartDao.readOne(criteria)
    }

    async readMany(criteria) {
        return await cartDao.readMany(criteria)
    }

    async createCart(products) {
        const _id = randomUUID() 
        const cart = await cartDao.create({_id, products})
        return cart.toObject()
    }

    async addProductToCart({cartId, productId}) {

        const cart = await cartDao.readOne({_id: cartId})
        if(!cart) throw new Error ('No existe el carrito')

        const product = await productDao.readOne({_id: productId})
        if(!product) throw new Error ('No existe el producto')

        const productCart = cart.products.find(p => p._id === productId)

        if(!productCart) {
            const updateCart = await cartDao.updateOneById(cartId, {
                $push: {products: {_id: productId, quantity: 1}}
            })
        } else {
            const updatedCart = await cartDao.updateOne(
                {_id: cartId, 'products._id':productId},
                {$inc: {'products.$.quantity':1}}
            )
        }
    }

    async updateCart ({cartId, cartUpdate}) {
        const cart = await cartDao.readOne({_id: cartId})
        const product = await productDao.readOne({_id: cartUpdate._id})

        const productCartExist = cart.products.find(p => p._id === cartUpdate._id)

        if (productCartExist) {
            const updatedCart = await cartDao.updateOne(
                {_id: cartId, 'products._id':cartUpdate._id},
                {$set: {'products.$.quantity': cartUpdate.quantity}}
            )
        }

        if(cart && product) {
            const cartUpdated = await cartDao.updateOneById(cartId, 
                {$push: {products: cartUpdate}})
        }

        if(!cart) {
            throw new Error ('error al actualizar: el carrito no existe')
        }
        if(!product) {
            throw new Error ('error al actualizar: el producto no existe')
        }
    }

    async updateProductsCart ({cartId, productId, cartProductUpdate}) {
        const cart = await cartDao.readOne({_id: cartId}) 
        const productExist = cart.products.find(p => p._id === productId)

        const quan = cartProductUpdate.quantity

        if(productExist) {
            const updatedProductCart = await cartDao.updateOne(
                {_id: cartId, 'products._id':productId},
                {$set: {'products.$.quantity': quan}}
            )
        }
    }

    async deleteAllProducts({cartId}) {
        const cart = await cartDao.readOne({_id: cartId})
        if(cart) {
            const productCartDelete = await cartDao.updateOneById(cartId, 
            {$set: {'products' : []}})
        } else {
        throw new Error ('error al borrar: carrito no encontrado')
        }
    }

    async deleteProductCart ({cartId, productId}) {
        const cart = await cartDao.readOne({_id: cartId})
        const product = cart.products.find ( p => p._id === productId)

        if(product) {
            const productCartDelete = await cartDao.updateOne(
                {_id: cartId, 'products._id': productId},
                {$unset: {'products.$._id':1, 'products.$.quantity':1}}
            )
        } else {
            throw new Error ('error al borrar: producto no encontrado')
        }
    }
}

export const CartService = new CartService()