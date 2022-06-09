const router = require('express').Router();
const {requiresAuth} = require('express-openid-connect')


// Require Controller
const design = require('../controllers/designs');

// GET Designs
router.get('/designs', requiresAuth(), design.getDesigns);


// // GET Design
router.get('/designs/:id', requiresAuth(), design.getDesignById, design.getDesign);


// POST Design (This should be restricted as we don't want customers creating Designs.)
router.post('/designs', requiresAuth(), design.createDesignItem);

// Delete Design
router.delete('/designs/:id', requiresAuth(), design.getDesignById, design.deleteDesign);

// Update Design (Probably restrict this to authorized users.)
router.put('/designs/:id', requiresAuth(), design.getDesignById, design.updateDesign);





module.exports = router;