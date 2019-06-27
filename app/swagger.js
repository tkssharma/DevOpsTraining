var swaggerJSDoc = require('swagger-jsdoc');

let swagger = function (app) {
 // swagger definition
 var swaggerDefinition = {
  info: {
   title: 'Node Swagger API',
   version: '1.0.0',
   description: 'Demonstrating how to describe a RESTful API with Swagger'
  },
  host: 'localhost:3000',
  basePath: '/'
 };

 // options for the swagger docs
 var options = {
  // const swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ['./**/**/routes.js','routes.js']
 };

 // initialize swagger-jsdoc
 var swaggerSpec = swaggerJSDoc(options);

 // serve swagger
 app.get('/swagger.json', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
 });
}
module.exports =  swagger;
