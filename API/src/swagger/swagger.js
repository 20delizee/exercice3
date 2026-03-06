import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de gestion",
      version: "1.0.0",
      description: "API Express avec MySQL",
    },

    servers: [
      {
        url: "http://localhost:3000",
        description: "Serveur de développement",
      },
    ],

    tags: [
      { name: "Products", description: "Gestion des produits" },
      { name: "Users", description: "Gestion des utilisateurs" },
      { name: "Ratings", description: "Gestion des avis" },
      { name: "Orders", description: "Gestion des commandes" },
      { name: "ApiKeys", description: "Gestion des clés API" },
    ],

    security: [
      {
        ApiKeyAuth: [],
      },
    ],

    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "x-api-key",
        },
      },
    },
  },

  apis: ["./src/modules/**/*.js"], 
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default setupSwagger;