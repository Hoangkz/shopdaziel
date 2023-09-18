const swaggerJsDoc = require('swagger-jsdoc');
const path = require('path');
const dirname = __dirname.replace(/swagger(?!.*swagger)/, '');
const option = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API FOR SHOPDALZIEL',
            description: 'API',
            version: '1.0.0'
        },
        basePath: '/api'
    },
    apis: [`${dirname}/routes/API/*.js`,
    ]
}
const swaggerSpec = swaggerJsDoc(option);

module.exports = swaggerSpec;