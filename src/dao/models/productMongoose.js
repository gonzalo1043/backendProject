import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    _id: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    status: {type: String, required: true},
    category: {type: String, required: true},
    thumbnail: {type: String},
    code: {type: String, required: true, unique: true},
    stock: {type: Number, required: true},
}, {versionKey: false,
    strict: 'throw'})

export const Product = mongoose.model('product', productSchema)
