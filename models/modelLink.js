const mongoose = require('mongoose');


const linkSchema = new mongoose.Schema({
    name: { type: String, required: true },
    server: { type: Schema.ObjectId, ref: 'Server', required: true },
    admin: { type: Schema.ObjectId, ref: 'Admin', required: true },
    activ: { type: boolean , default: false},



}, { timestamps: true });

module.exports = mongoose.model('Server', linkSchema);