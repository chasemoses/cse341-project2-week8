const Product = require('../models/product');

const getProducts = async (req, res) => {

    // #swagger.tags = ['Products']
    // #swagger.description = 'Get all product items in collection'

    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch(err) {
        res.status(500).json({message: err.message});
    }

}

const getProduct = async (req, res) => {

    // #swagger.tags = ['Products']
    // #swagger.description = 'Get one product in collection using an ID.'

    try {
        res.status(200).json(res.product);

    } catch(err) {
        res.status(400).json({message: err.message});
    }

}

const createProducts = async (req, res) => {
    const product = new Product ({

        // #swagger.tags = ['Products']
        // #swagger.description = 'Create a product item in the product collection'

        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        type: req.body.type,
        size: req.body.size,
        color: req.body.color,
        price: req.body.price,
    })

    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch(err) {
        res.status(400).json({message: err.message});

    }

}

const deleteProduct = async (req, res) => {

    // #swagger.tags = ['Products']
    // #swagger.description = 'Delete one product in the collection using an ID.'

    try {

        await res.product.deleteOne();

        res.json("Product Deleted");

    } catch(err) {
        res.status(500).json({message: err.message});
    }

}

const updateProduct = async (req, res) => {

    // #swagger.tags = ['Products']
    // #swagger.description = 'Update exisiting Product in the database using ID to locate that Product'

    // Easy to read variable.
    const request = req.body;

    // Update contact to be whatever user specified.
    if(request.name != null) {
        res.product.name = request.name
    }
    if(request.description != null) {
        res.product.description = request.description
    }
    if(request.category != null) {
        res.product.category = request.category
    }
    if(request.type != null) {
        res.product.type = request.type
    }
    if(request.size != null) {
        res.product.size = request.size
    }
    if(request.color != null) {
        res.product.color = request.color
    }
    if(request.price != null) {
        res.product.price = request.price
    }

    // Try to update the database
    try {
        const updatedProduct = await res.product.save();
        res.status(200).json(updatedProduct);
    }
     catch(err) {
        res.status(400).json({message: err.message});
    }

}

// Middleware
async function getProductById(req,res,next) {

    let product;

    try {
        product = await Product.findById(req.params.id);

        if(product == null)
        {
            return res.status(404).json({message: "Could not find specified product"});
        }
    } catch(err) {
        return res.status(500).json({message: err.message});
    }
    res.product = product;
    next();


}


module.exports = {
    getProducts,
    getProduct,
    createProducts,
    updateProduct,
    deleteProduct,
    getProductById
}