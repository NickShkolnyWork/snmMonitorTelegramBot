const mongoose = require('mongoose');


const serverSchema = new mongoose.Schema({
    name: { type: String, minlength: 3, required: true },
    ip: { type: String, minlength: 3, required: true },
    url: { type: String, minlength: 3, required: true },
    status: { type: String },
    token: { type: String }


}, { timestamps: true });

module.exports = mongoose.model('Server', serverSchema);