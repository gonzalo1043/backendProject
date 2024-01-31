import { Schema } from "mongoose";

const ticketSchema = new Schema({
    id: {type: String, require: true},
    code: {type: String, unique: true},
    purchase_datetime: String,
    amount: Number,
    purchaser: String
}, {versionKey: false})

const ticketModel = model('ticket', ticketSchema)

// _________________________________

export class TicketDao {

    async create(element) {
        const ticket = await ticketModel.create(element)
        return ticket.toObject()
    }

    async readOne(criteria) {
        const result = await ticketModel.findOne(criteria)
        if(!result) throw new Error('NOT FOUND')
        return result
    }

    async readMany(criteria) {
        return await ticketModel.find(criteria).lean()
    }

}