const { Decimal128 } = require('mongodb');
const mongoose = require('mongoose')

const designSchema = new mongoose.Schema({

    name: String,
    material: String,
    price: Decimal128

});

const designs = mongoose.model('Design', designSchema, "designs");

module.exports = designs;