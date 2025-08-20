const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");
const { version } = require("os");
const { serve } = require("swagger-ui-express");

const options = {
    definition: {
        openapi: "3.1.1",
        info: {
            title: "Task Manager API",
            version: "0.1.0",
            description: "API application made with Express and documented with Swagger",
            license: {
                name: "MIT",
                url: "https://choosealicense.com/licenses/mit/",
            },
            contact: {
                name: "Cloudaffle",
                url: "https://github.com/mdsrkhnafd",
                email: "developera951@gmail.com"
            },
        },

        servers : [
            {
                url: "http://localhost:3001"
            },
        ],
        
    },
    apis: [path.join(__dirname, ".." , "**/*.js")],
}

const specs = swaggerJsdoc(options);

module.exports = specs;