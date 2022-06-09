const router = require('express').Router();
const {requiresAuth} = require('express-openid-connect')


// Require Controller
const products = require('../controllers/products');

// GET Products
router.get('/products', products.getProducts);


// GET Product
router.get('/products/:id', products.getProductById, products.getProduct);


// POST Product (This should be restricted as we don't want customers creating products.)
router.post('/products', requiresAuth(), products.createProducts);

// Delete Product
router.delete('/products/:id', requiresAuth(), products.getProductById, products.deleteProduct);

// Update Product (Probably restrict this to authorized users.)
router.put('/products/:id', requiresAuth(), products.getProductById, products.updateProduct);





module.exports = router;