import fs from 'fs/promises'
import { CARTPATH } from '../../../config/serverConfig.js';
import { Cart } from '../../../models/CartFileSystem.js';

const ruta = CARTPATH

export class CartManagerArchivos {
    #cart 
    #products = []

    constructor() {
        this.ruta = ruta
        this.#cart = []
        this.products = []
    }

    async init() {
        try {
            await this.#leerCarrito()
        } catch (error) {
            await this.#escribirCarrito()
        }
    }

    #generarNuevoId() {
        if (this.#cart .length > 0 ) {
            return this.#cart [this.#cart .length - 1].id + 1
        } else {
            return 1
        }
    } 

    async #leerCarrito() {
        const contenido = await fs.readFile(this.ruta, 'utf-8')
        this.#cart = JSON.parse(contenido)
    }
    async #escribirCarrito() {
        await fs.writeFile(this.ruta, JSON.stringify(this.#cart , null, 2))
    }

    async addCart() {
        await this.#leerCarrito()

        const id = this.#generarNuevoId()
        const products = this.#products
        const cart = new Cart ({id, products})

        this.#cart.push(cart)
        await this.#escribirCarrito()
        return cart
    }

    async getCartById (id) {
        await this.#leerCarrito()
        const busqueda = this.#cart.find(p=> p.id === id)
        if (!busqueda) throw new Error ('El carrito no existe')
        return busqueda
    }

    async addProductToCart(cartId, product) {
        await this.#leerCarrito()
        const cartBuscado =  this.#cart.find(c => c.id === cartId)
        const productId = product.id
        let quantity = 1
        
        if (!cartBuscado) throw new Error ('El carrito no existe')
        
        const productExist = cartBuscado.products.find(p => p.id === productId)
        
        if (productExist) {
            productExist.quantity = productExist.quantity + 1
        } else {
            cartBuscado.products.push({
            id: productId,
            quantity: quantity })
        }
        await this.#escribirCarrito()
        return cartBuscado
    }

    async deleteCart(id) {
        await this.#leerCarrito()
        const index = this.#cart.findIndex(p => p.id === id)
        if (index !== -1) {
            const arrayConLosBorrados = this.#cart.splice(index, 1)
            await this.#escribirCarrito()
            return arrayConLosBorrados[0]
        } else {
            throw new Error ('error al borrar: carrito no encontrado')
        }
    }

    async deleteAll() {
        await this.#leerCarrito()
        this.#cart = []
        await this.#escribirCarrito()
        
    }
}


