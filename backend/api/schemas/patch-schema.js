import mongoose from 'mongoose'

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
    date: { 
        type: Date, 
        default: Date.now 
    }
}, { collection: 'patches' })

const Patch = mongoose.model('Patch', patchSchema)

export { Patch, patchSchema }
