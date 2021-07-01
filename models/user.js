const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
    }
}, {
    timestamps: true });

exports.UserModel = model('user', userSchema);