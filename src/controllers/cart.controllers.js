import {cartService } from "../services/cart.services.js"

export async function handleGet(req, res, next) {
    try {
        if(req.params.id) {
            res.json( await cartService.readOne({_id: req.params.id}))
        } else {
            res.json(await cartService.readMany({}))
        }
    } catch (error) {
        next(error)
    }
}
export async function handlePost() {
    try {
        res.json(await cartService.create(req.body))
    } catch (error) {
        next(error)
    }}

export async function handlePostProtuctCart() {
    try {
        res.json(await cartService.addProductToCart({cartId: req.params.cid, productId: req.params.pid}))
    } catch (error) {
        next(error)
    }
}

export async function handleDelete() {
    try {
        res.json(await cartService.deleteProductCart({cartId: req.params.cid, productId: req.params.pid}))
    } catch (error) {
        next(error)
    }
}

export async function handleDeleteAll() {
    try {
        res.json(await cartService.deleteAllProducts({cartId: req.params.cid}))
    } catch (error) {
        next(error)
    }
}

export async function handlePutCart() {
    try {
        res.json(await cartService.updateCart({cartId: req.params.cid, cartUpdate: req.body}))
    } catch (error) {
        next(error)
    }
}

export async function handlePutProductCart() {
    try {
        res.json(await cartService.updateProductsCart({cartId: req.params.cid, productId: req.params.pid, cartProductUpdate: req.body}))
    } catch (error) {
        next(error)
    }
}



