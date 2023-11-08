import { Router } from "express";
import { ProductManager } from "../Services/ProductManager.js";
import { CARTPATH, PRODUCTS_PATH } from '../src/config.js'
import { CartManager } from '../Services/cartManager.js'

export const cartRouter = Router()

const pm = new ProductManager(PRODUCTS_PATH)
const cm = new CartManager(CARTPATH)

cartRouter.post('/carts', async (req, res) => {
    if (cm.cart = []) {
    await cm.init()
    res.json(await cm.addCart())
    } else {
        res.json(await cm.addCart())
    }
})

cartRouter.get('/carts/:cid', async(req, res) => {
    try {
        const cartId = parseInt(req.params.cid)
        res.json(await cm.getCartById(cartId))
    } catch (error) {
        res.status(400).json({ errorMessage : error.message})
    }
})

cartRouter.post('/carts/:cid/product/:pid', async(req, res) => {
    try {
        const cartId = parseInt(req.params.cid)
    
        const productId = parseInt(req.params.pid)  
        const product = await pm.getProductById(productId)
    
        res.json(await cm.addProductToCart(cartId, product))
    } catch (error) {
        res.status(400).json({ errorMessage : error.message})
    }
})

cartRouter.delete('/carts/:did', async (req, res) => {
    try {
        const cartId = parseInt(req.params.did)
        res.json(await cm.deleteCart(cartId))
    } catch (error) {
        res.status(400).json({ errorMessage : error.message})
    }
})

cartRouter.delete('/carts', async (req, res) => {
    try {
        res.json(await cm.deleteAll())
    } catch (error) {
        res.status(400).json({ errorMessage : error.message})
    }
}) 


