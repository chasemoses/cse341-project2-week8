const mongoose = require('mongoose')

const inventorySchema = new mongoose.Schema({

    category: String,
    type: String,
    size: String,
    color: String,
    quantity: Number
});

const inventory = mongoose.model('Inventory', inventorySchema, "inventory");

module.exports = inventory;