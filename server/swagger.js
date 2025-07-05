import dotenv from "dotenv";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Заметок",
      version: "1.0.1",
      description: "Документация API для приложения заметок",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  servers: [
    {
      url: process.env.SERVER_URL,
    },
  ],
  apis: [
    path.join(__dirname, "../routers/**/*.js"),
    path.join(__dirname, "../models/**/*.js"),
    // path.join(__dirname, "./**/*.js"),
  ],
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(
    `📄 Swagger доступен по адресу: ${process.env.SERVER_URL}api-docs`
  );
};

export default setupSwagger;
