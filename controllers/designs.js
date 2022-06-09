const Design = require('../models/design');

const getDesigns = async (req, res) => {

    // #swagger.tags = ['Designs']
    // #swagger.description = 'Get all designs in collection'

    try {
        const designs = await Design.find();
        res.status(200).json(designs);
    } catch(err) {
        res.status(500).json({message: err.message});
    }

}

const getDesign = async (req, res) => {

    // #swagger.tags = ['Designs']
    // #swagger.description = 'Get one design in collection using an ID.'

    try {
        res.status(200).json(res.design);

    } catch(err) {
        res.status(400).json({message: err.message});
    }

}

const createDesignItem = async (req, res) => {
    const design = new Design ({

        // #swagger.tags = ['Designs']
        // #swagger.description = 'Create design item and save in design collection'

        // Functionality - Would be beneficial to determine if there is a record already in the database, and if it is, up the quantity instead for inventory items.
        name: req.body.name,
        material: req.body.material,
        price: req.body.price
    })

    try {
        const newDesignItem = await design.save();
        res.status(201).json(newDesignItem);
    } catch(err) {
        res.status(400).json({message: err.message});

    }

}

const deleteDesign = async (req, res) => {

    // #swagger.tags = ['Designs']
    // #swagger.description = 'Delete one design in the collection using an ID.'

    try {

        await res.design.deleteOne();

        res.json("Design Deleted");

    } catch(err) {
        res.status(500).json({message: err.message});
    }

}

const updateDesign = async (req, res) => {

    // #swagger.tags = ['Designs']
    // #swagger.description = 'Update exisiting contact in the database using ID to locate that contact.'

    // Easy to read variable.
    const request = req.body;

    // Update contact to be whatever user specified.
    if(request.name != null) {
        res.design.name = request.name
    }
    if(request.material != null) {
        res.design.material = request.material
    }
    if(request.price != null) {
        res.design.price = request.price
    }

    // Try to update the database
    try {
        const updatedDesign = await res.design.save();
        res.status(200).json(updatedDesign);
    }
     catch(err) {
        res.status(400).json({message: err.message});
    }

}

// Middleware
async function getDesignById(req,res,next) {

    let design;

    try {
        design = await Design.findById(req.params.id);

        if(design == null)
        {
            return res.status(404).json({message: "Could not find specified design"});
        }
    } catch(err) {
        return res.status(500).json({message: err.message});
    }
    res.design = design;
    next();


}


module.exports = {
    getDesigns,
    createDesignItem,
    getDesign,
    deleteDesign,
    updateDesign,
    getDesignById
}