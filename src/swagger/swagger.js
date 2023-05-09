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
        servers: [{
            url: 'http://localhost:8000'
        }]
    },
    apis: [
        path.join(dirname, '/routes/authRouter.js'),
        path.join(dirname, '/routes/userRouter.js'),
        path.join(dirname, '/routes/itemsRouter.js'),
        path.join(dirname, '/routes/buyRouter.js'),
    ]
}
const swaggerSpec = swaggerJsDoc(option);

module.exports = swaggerSpec;