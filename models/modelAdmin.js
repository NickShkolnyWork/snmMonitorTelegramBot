const mongoose = require('mongoose');


const adminSchema = new mongoose.Schema({
    login: { type: String, minlength: 3, required: true },
    password: { type: String, minlength: 3, required: true },
    name: { type: String, minlength: 3, required: false },
    idChat: { type: String, minlength: 3, required: false },
    stateAdmin: { type: String },
    messType: { type: Array }

}, { timestamps: true });

module.exports = mongoose.model('Admin', adminSchema);