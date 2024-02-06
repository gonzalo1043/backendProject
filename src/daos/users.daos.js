import { Schema, model } from "mongoose";
import { randomUUID } from "crypto";

const usersSchema = new Schema({
    _id: { type: String, default: randomUUID },
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    lastname: { type: String, required: true },
    age: { type: Number, required: true },
    cart: { id: {type: String, required: true, ref: 'Cart'} },
    rol: { type: String, default: 'user' }
},{ versionKey: false })

const usersModel = model('users', usersSchema)

export class UsersDao {

    async create(element) {
        const user = await usersModel.create(element)
        return user.toObject()
        }
    
    async readOne(criteria) {
        const result = await usersModel.findOne(criteria).lean()
        if (!result) throw new Error('NOT FOUND')
        return result
        }
    
    async readMany(criteria) {
        return await usersModel.find(criteria).lean()
        }
    
    async updateOne(criteria, newData) {
        const modifiedUser = await usersModel
            .findOneAndUpdate(criteria, newData, { new: true })
            .lean()
        if (!modifiedUser) throw new Error('NOT FOUND')
        return modifiedUser
        }
    
    async updateMany(criteria, newData) {
        return Promise.reject(new Error('NOT IMPLEMENTED: usersDao::updateMany'))
        }
    
    async deleteOne(criteria) {
        const deletedUser = await usersModel
            .findOneAndDelete(criteria)
            .lean()
        if (!deletedUser) throw new Error('NOT FOUND')
        return deletedUser
        }
    
    async deleteMany(criteria) {
        return Promise.reject(new Error('NOT IMPLEMENTED: usersDao::deleteMany'))
        }
    }