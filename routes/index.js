const express = require('express');
const router = express.Router();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger/swagger-output.json');


router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

router.use('/', require('./product'));
router.use('/', require('./inventory'));
router.use('/', require('./design'));








module.exports = router;