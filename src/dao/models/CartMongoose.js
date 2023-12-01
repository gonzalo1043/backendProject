import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    _id: {type: String, required: true},
    products: [{_id: {type: String}, quantity: {type: Number}}]
}, {versionKey: false,
    strict: 'throw'})

export const Cart = mongoose.model('cart', cartSchema)

