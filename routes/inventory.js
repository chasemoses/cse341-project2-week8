const router = require('express').Router();
const {requiresAuth} = require('express-openid-connect')


// Require Controller
const inventory = require('../controllers/inventory');

// GET Inventory items
router.get('/inventory', requiresAuth(), inventory.getInventoryItems);


// GET Inventory Item
router.get('/inventory/:id', requiresAuth(), inventory.getInventoryById, inventory.getInventoryItem);


// POST Inventory Item (This should be restricted as we don't want customers creating products.)
router.post('/inventory', requiresAuth(),  inventory.createInventoryItem);

// Delete Inventory Item
router.delete('/inventory/:id', requiresAuth(), inventory.getInventoryById, inventory.deleteInventoryItem);

// Update Inventory Item (Probably restrict this to authorized users.)
router.put('/inventory/:id', requiresAuth(), inventory.getInventoryById, inventory.updateInventoryItem);





module.exports = router;