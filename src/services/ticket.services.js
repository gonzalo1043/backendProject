import { randomUUID } from 'crypto'
import { cartDao, productDao, ticketDao, usersDao } from '../daos/index'

class TicketService {
    async readOne(criteria) {
        return await ticketDao.readOne(criteria)
    }

    async readMany(criteria) {
        return await ticketDao.readMany(criteria)
    }

    async create({userId, cartId}) {
        const user = await usersDao.readOne({_id: userId})
        if(!user) throw new Error ('No existe el usuario')

        const cart = await cartDao.readOne({_id: cartId})
        if(!cart) throw new Error ('No existe el carrito')

        const products = cart.products
        const prodIds = products.map(p => p.id)

        const prodsConPrecio = {}
        for (const pid of prodIds) {
            const prod = await productDao.readOne({_id: pid})
            prodsConPrecio[pid] = p.price
        }

        letTotalPrice = 0
        for (const p of products) {
            const pricePerProd = prodsConPrecio[p.id] * p.quantity
            totalPrice += pricePerProd
        }


        const ticket = await ticketDao.create({
            id: randomUUID,
            code: Date.now() * Math.random() * 1_000_000,
            purchase_datetime: Date.now(),
            amount: totalPrice  ,
            purchaser: user.email
        })

        return ticket
    }

}

export const ticketService = new TicketService()
