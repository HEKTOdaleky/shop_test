const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OrderSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    brand: {
        type: Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
    },
    subcategory: {
        type: Schema.Types.ObjectId,
        ref: 'SubCategory',
        required: true
    },
    price: {
        type: Number,
        default: 0,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    about: String
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;