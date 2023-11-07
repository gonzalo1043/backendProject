import fs from 'fs/promises'
import { Product } from '../models/Product.js';
import { PRODUCTS_PATH } from '../src/config.js';

const ruta = PRODUCTS_PATH 

export class ProductManager {
    #products 

    constructor() {
        this.ruta = ruta
        this.#products  = []
    }

    async init() {
        try {
            await this.#leerProducto()
        } catch (error) {
            await this.#escribirProductos()
        }
    }

    #generarNuevoId() {
        if (this.#products.length > 0 ) {
            return this.#products[this.#products.length - 1].id + 1
        } else {
            return 1
        }
    } 

    async #leerProducto() {
        const contenido = await fs.readFile(this.ruta, 'utf-8')
        this.#products = JSON.parse(contenido)
    }
    async #escribirProductos() {
        await fs.writeFile(this.ruta, JSON.stringify(this.#products, null, 2))
    }

    async modificarProductos(id, prodData) {
        await this.#leerProducto()
        const index = this.#products.findIndex (p => p.id === id)
        if (index == -1) {
            throw new Error ('error al actualizar: producto no encontrado')
        } else if (prodData.id) {
            throw new Error ('error al actualizar: no se puede cambiar el id')
        } else {
            const nuevoProd = new Product({id, ...this.#products[index], ...prodData })
            this.#products[index] = nuevoProd
            await this.#escribirProductos()
            return nuevoProd
        }
    }

    async deleteProducts(id) {
        await this.#leerProducto()
        const index = this.#products.findIndex(p => p.id === id)
        if (index !== -1) {
            const arrayConLosBorrados = this.#products.splice(index, 1)
            await this.#escribirProductos()
            return arrayConLosBorrados[0]
        } else {
            throw new Error ('error al borrar: producto no encontrado')
        }
    }


    async addProduct({title, description, price, status, category, thumbnail, code, stock}) {
        await this.#leerProducto()

        const id = this.#generarNuevoId()
        
        const codeExist = this.#products.find( p => p.code === code)
        
        if (!title || !description || !price || !code || !stock || !status ||!category) {
            throw new Error ('Los campos son obligatorios')
        }
        
        if (codeExist) {
            throw new Error ('El codigo esta repetido')
        }

        const product = new Product ({id, title, description, price, status, category, thumbnail, code, stock} )

        this.#products.push(product)
        await this.#escribirProductos()
        return product
    }

    async getProducts(query = {}) {
        await this.#leerProducto()
        
        if(query.limit) {
            return this.#products.slice(0,query.limit)
            }    
            return this.#products  
        } 

    async getProductById (id) {
        await this.#leerProducto()
        const busqueda = this.#products.find(p=> p.id === id)
        if (!busqueda) throw new Error ('El producto no existe')
        return busqueda
    }
}


