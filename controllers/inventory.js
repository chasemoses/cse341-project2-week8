const Inventory = require('../models/inventory');


const getInventoryItems = async (req, res) => {

    // #swagger.tags = ['Inventory']
    // #swagger.description = 'Get all inventory items in collection'

    try {
        const inventory = await Inventory.find();
        res.status(200).json(inventory);

    } catch(err) {
        res.status(500).json({message: err.message});
        
    } 
}
const getInventoryItem = async (req, res) => {

    // #swagger.tags = ['Inventory']
    // #swagger.description = 'Get inventory item in collection'

    try {
        res.status(200).json(res.inventory);
    } catch(err) {
        res.status(500).json({message: err.message});
    }

}

const createInventoryItem = async (req, res) => {
    const inventory = new Inventory ({

        // #swagger.tags = ['Inventory']
        // #swagger.description = 'Create an inventory item in collection'

        // Functionality - Would be beneficial to determine if there is a record already in the database, and if it is, up the quantity instead for inventory items.
        category: req.body.category,
        type: req.body.type,
        size: req.body.size,
        color: req.body.color,
        quantity: req.body.quantity,
    })

    try {
        const newInventoryItem = await inventory.save();
        res.status(201).json(newInventoryItem);
    } catch(err) {
        res.status(400).json({message: err.message});

    }

}

const deleteInventoryItem = async (req, res) => {

    // #swagger.tags = ['Inventory']
    // #swagger.description = 'Delete an inventory item in collection'

    try {
        await res.inventory.deleteOne();
        res.json("Inventory Item Deleted");
    } catch(err) {
        res.status(500).json({message: err.message});
    }

}

const updateInventoryItem = async (req, res) => {

    // #swagger.tags = ['Inventory']
    // #swagger.description = 'Update a single inventory item using an ID'

    // Easy to read variable.
    const request = req.body;

    // Update contact to be whatever user specified.
    if(request.category != null) {
        res.inventory.category = request.category
    }
    if(request.type != null) {
        res.inventory.type = request.type
    }
    if(request.size != null) {
        res.inventory.size = request.size
    }
    if(request.color != null) {
        res.inventory.color = request.color
    }
    if(request.quantity != null) {
        res.inventory.quantity = request.quantity
    }

    // Try to update the database
    try {
        const updatedInventory = await res.inventory.save();
        res.status(200).json(updatedInventory);
    }
     catch(err) {
        res.status(400).json({message: err.message});
    }

}

// Middleware
async function getInventoryById(req,res,next) {

    let inventory;

    try {
        inventory = await Inventory.findById(req.params.id);

        if(inventory == null)
        {
            return res.status(404).json({message: "Could not find specified inventory item"});
        }
    } catch(err) {
        return res.status(500).json({message: err.message});
    }
    res.inventory = inventory;
    next();


}

module.exports = {
    getInventoryItems,
    getInventoryItem,
    createInventoryItem,
    deleteInventoryItem,
    updateInventoryItem,
    getInventoryById
}