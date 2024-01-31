import { CartService } from "../services/cart.services"

export async function handleGet(req, res, next) {
    try {
        if(req.params.id) {
            res.json( await CartService.readOne({_id: req.params.id}))
        } else {
            res.json(await CartService.readMany({}))
        }
    } catch (error) {
        next(error)
    }
}
export async function handlePost() {
    try {
        res.json(await CartService.create(req.body))
    } catch (error) {
        next(error)
    }}

export async function handlePostProtuctCart() {
    try {
        res.json(await CartService.addProductToCart({cartId: req.params.cid, productId: req.params.pid}))
    } catch (error) {
        next(error)
    }
}

export async function handleDelete() {
    try {
        res.json(await CartService.deleteProductCart({cartId: req.params.cid, productId: req.params.pid}))
    } catch (error) {
        next(error)
    }
}

export async function handleDeleteAll() {
    try {
        res.json(await CartService.deleteAllProducts({cartId: req.params.cid}))
    } catch (error) {
        next(error)
    }
}

export async function handlePutCart() {
    try {
        res.json(await CartService.updateCart({cartId: req.params.cid, cartUpdate: req.body}))
    } catch (error) {
        next(error)
    }
}

export async function handlePutProductCart() {
    try {
        res.json(await CartService.updateProductsCart({cartId: req.params.cid, productId: req.params.pid, cartProductUpdate: req.body}))
    } catch (error) {
        next(error)
    }
}



