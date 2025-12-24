require("dotenv").config();
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const app = express();

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "AutoParts Trade API",
      version: "1.0.0",
      description: "API для магазина автозапчастей"
    },
    servers: [
      {
        url: "http://localhost:8080",
        description: "Development server"
      }
    ],
    tags: [
      {
        name: "Товары",
        description: "Операции с автозапчастями"
      }
    ]
  },
  apis: ["./app/routes/*.js"]
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.json({ 
    message: "AutoParts Trade API", 
    docs: "/api-docs",
    endpoints: ["/api/goods"]
  });
});

const db = require("./app/models");

db.sequelize.authenticate()
  .then(() => {
    console.log("Database connected successfully.");
    
    return db.sequelize.sync();
  })
  .then(() => {
    console.log("Database synchronized.");
    
    require("./app/routes/goods.routes")(app);
    console.log("Routes loaded.");
  })
  .catch(err => {
    console.error("Database error:", err.message);
  });

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API Documentation: http://localhost:${PORT}/api-docs`);
});