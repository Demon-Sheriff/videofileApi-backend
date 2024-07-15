const express = require('express');
const videoRoutes = require('./routes/videoRoutes');
const path = require('path')
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Video API',
            version: '1.0.0',
            description: 'API for uploading, trimming, and merging videos',
        },
        servers: [
            {
                url: 'http://localhost:3000/api',
            },
        ],
    },
    apis: ['./routes/*.js'], // Path to the API docs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// serve static files from the uploads directory
app.use(express.static(path.join(__dirname, 'public')));

// use middleware
app.use(express.json());

// establish db connection with sequelise
require('./config/db')

// routing
app.use('/api/videos', videoRoutes);

// start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    
    console.log(`Server running on port ${PORT}`);
});