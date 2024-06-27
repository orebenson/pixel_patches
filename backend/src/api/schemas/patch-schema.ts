import mongoose from 'mongoose'
import { User } from './user-schema'

const patchSchema = new mongoose.Schema({
    patchPixelHexes: { 
        type: [String], 
        required: true,
        validate: {
            validator: async function(value) {
                const existingPatch = await this.constructor.findOne({ patchPixelHexes: value });
                return !existingPatch;
            },
            message: 'Pixel Patches must be unique'
        }
    },
    username: {
        type: String,
        default: '', 
        validate: {
            validator: async function(value) {
                if (!value) return true;
                const existingUser = await User.findOne({ username: value });
                return !!existingUser;
            },
            message: 'Username must exist in user schema'
        }
    },
    date: { 
        type: Date, 
        default: Date.now()
    }
}, { collection: 'patches' })

const Patch = mongoose.model('Patch', patchSchema)

export { Patch, patchSchema }
