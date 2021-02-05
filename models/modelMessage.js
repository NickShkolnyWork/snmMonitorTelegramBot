const mongoose = require('mongoose');

let Schema = mongoose.Schema;

const messageSchema = new Schema({

    server: { type: Schema.ObjectId, ref: 'Server', required: true },
    dataTime: { type: Date, required: false },
    messType: { type: Array },
    message: { type: Object },
    message_ru: { type: Object }

}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);















// var mongoose = require('mongoose');
//
// var Schema = mongoose.Schema;
//
// var BookSchema = new Schema(
//     {
//         title: {type: String, required: true},
//         author: {type: Schema.ObjectId, ref: 'Author', required: true},
//         summary: {type: String, required: true},
//         isbn: {type: String, required: true},
//         genre: [{type: Schema.ObjectId, ref: 'Genre'}]
//     }
// );
//
// // Virtual for book's URL
// BookSchema
//     .virtual('url')
//     .get(function () {
//         return '/catalog/book/' + this._id;
//     });
//
// //Export model
// module.exports = mongoose.model('Book', BookSchema);