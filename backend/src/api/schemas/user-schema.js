import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        validate: {
            validator: async function (value) {
                const existingUserEmail = await this.constructor.findOne({ email: value });
                return !existingUserEmail;
            },
            message: 'User email must be unique'
        }
    },
    username: {
        type: String,
        required: true,
        validate: {
            validator: async function (value) {
                const existingUser = await this.constructor.findOne({ username: value });
                return !existingUser;
            },
            message: 'Username must be unique'
        }
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { collection: 'users' })

const User = mongoose.model('User', userSchema)

export { User, userSchema }
