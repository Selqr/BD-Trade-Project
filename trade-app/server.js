require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Простой маршрут
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Auto Parts Shop API" });
});

// Подключение к базе данных
const db = require("./app/models");
db.sequelize.sync({ force: true })
  .then(() => {
    console.log("Database synced successfully.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// Подключаем маршруты
require("./app/routes/goodsgroup.routes.js")(app);
require("./app/routes/goods.routes.js")(app); 

// Установка порта
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  console.log(`API available at http://localhost:${PORT}/api/goodsgroups`);
});