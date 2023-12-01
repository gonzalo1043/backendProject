import { Router } from "express";
import { CARTPATH, PRODUCTS_PATH } from '../config/serverConfig.js'
import { cartManager } from '../dao/services/cartManager.js'

export const cartRouter = Router()


cartRouter.post('/carts', async (req, res) => {
try {
    res.json(await cartManager.addCart())
    
} catch (error) {
    res.status(400).json({ errorMessage : error.message})
}})

cartRouter.get('/carts/:cid', async(req, res) => {
    try {
        const cartId = req.params.cid
        res.json(await cartManager.getCartById(cartId))
    } catch (error) {
        res.status(400).json({ errorMessage : error.message})
    }
})

cartRouter.post('/carts/:cid/product/:pid', async(req, res) => {
    try {
        const cartId = req.params.cid
    
        const productId = req.params.pid
        // const product = await productManager.getProductById(productId)
    
        res.json(await cartManager.addProductToCart(cartId, productId))
    } catch (error) {
        res.status(400).json({ errorMessage : error.message})
    }
})

cartRouter.delete('/carts/:did', async (req, res) => {
    try {
        const cartId = req.params.did
        res.json(await cartManager.deleteCart(cartId))
    } catch (error) {
        res.status(400).json({ errorMessage : error.message})
    }
})

// cartRouter.delete('/carts', async (req, res) => {
//     try {
//         res.json(await cm.deleteAll())
//     } catch (error) {
//         res.status(400).json({ errorMessage : error.message})
//     }
// }) 


