import mongoose from 'mongoose';

const SecretSchema = new mongoose.Schema({
    secret: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 500,
    },
    expireAfter: {
        type: Date,
        required: true,
        default: Date.now() + 3600000 * 24, // 1 day
    },
    expireOnOpen: {
        type: Boolean,
        required: true,
        default: false,
    },
    iv: {
        type: String,
        required: true,
    },
    isOpened: {
        type: Boolean,
        default: false,
    }
})

export default mongoose.models.Secret || mongoose.model('Secret', SecretSchema);