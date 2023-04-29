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
        path.join(dirname, '/routes/API/authRouter.js'),
        path.join(dirname, '/routes/API/buyRouter.js'),
        path.join(dirname, '/routes/API/homeRouter.js'),
        path.join(dirname, '/routes/API/itemsRouter.js'),
        path.join(dirname, '/routes/API/userRouter.js'),
    ]
}
const swaggerSpec = swaggerJsDoc(option);

module.exports = swaggerSpec;