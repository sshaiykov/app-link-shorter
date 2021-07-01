const { Schema, model, Types } = require('mongoose')

const LinkSchema = new Schema({
    ownerId: {
        // Автор ссылки
        type: Types.ObjectId,
        required: true,
        ref: 'user'
    },
    redirectId: {
        //Персональный ID ссылки
        type: String,
        required: true,
    },
    clickCount: {
        type: Number,
        default: 0
    },
    from: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true
    }
}, 
{ timestamps: true },
);

exports.Linkmodel = model('link', LinkSchema);