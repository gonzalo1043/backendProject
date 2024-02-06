import { productService } from "../services/products.services.js"

export async function handleGet(req, res, next) {
    const limit = parseInt(req.query.limit)
    const page = req.query.page
    const sort = req.query.sort
    const category= req.query.category
    const stock = req.query.stock
    try {
        res.json(await productService.readMany({limit, page, sort, category, stock}))
    } catch (error) {
        next(error)
    }
}

export async function handleGetById(req, res, next) {
    try {
        res.json(await productService.readOne({id: req.params.id}))
    } catch (error) {
        next(error)
    }
}

export async function handlePost() {
    try {
        const body = req.body
        res.json(await productService.createProduct({...body}))
    } catch (error) {
        next(error)
    }
}

export async function handlePut() {
    try {
        res.json(await productService.updateProduct({productId: req.params.id, productUpdate: req.body}) )
    } catch (error) {
        next(error)
    }
}
export async function handleDelete() {
    try {
        res.json(await productService.deleteProduct({productId: req.params.id}))
    } catch (error) {
        next(error)
    }
}


