const mongoose = require('mongoose');
const ItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true }
});

module.exports = mongoose.model('Item', ItemSchema);