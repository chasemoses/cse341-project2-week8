const {Decimal128 } = require('mongodb')
const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({

    name: String,
    description: String,
    category: String,
    type: String,
    size: String,
    color: String,
    price: Decimal128,
});

const product = mongoose.model('Product', productSchema, "products");

module.exports = product;