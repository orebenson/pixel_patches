import mongoose, { Schema } from 'mongoose'
import { User } from './user-schema'

const tokenSchema = new mongoose.Schema({
    userid: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    token: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
}, { collection: 'tokens' })

const Token = mongoose.model('Token', tokenSchema)

export { Token, tokenSchema }
