const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Pink Elephant Creation APIs',
    description: 'API endpoints meant for customers to access products, as well as those authorized to access inventory, designs, and updating products.',
  },
  host: ['cse341-project2-lesson7.herokuapp.com'],
  schemes: ['https','http'],
  tags: [
      {
          name: 'Products',
          description: 'API endpoints for Products collection.'
      },
      {
          name: 'Inventory',
          description: 'API endpoints for Inventory collection'
      },
      {
          name: 'Designs',
          description: 'API endpoints for Designs collection'
      }
  ]
};

const outputFile = './swagger/swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

   swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('../server.js'); // Your project's root file
  });