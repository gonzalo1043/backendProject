import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    user: {type: String, required: true},
    message: {type: String, required: true}
}, {versionKey: false,
    strict: 'throw'})

export const Message = mongoose.model('message', messageSchema)