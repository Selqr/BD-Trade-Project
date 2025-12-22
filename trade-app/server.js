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

app.get("/", (req, res) => {
  res.json({ message: "Welcome to trade-app application." });
});

const db = require("./app/models");

db.sequelize.sync({ force: true })
  .then(() => {
    console.log("Database tables dropped and re-created.");
    return createTestData(db);
  })
  .then(() => {
    console.log("Test data created successfully.");
  })
  .catch((err) => {
    console.log("Database error: " + err.message);
  });

async function createTestData(db) {
  try {
    const group1 = await db.goodsGroup.create({
      name: "Электроника",
      code: "ELEC",
      description: "Электронные товары"
    });
    
    const group2 = await db.goodsGroup.create({
      name: "Запчасти",
      code: "PARTS",
      description: "Автозапчасти"
    });
    
    console.log("Created goods groups:", group1.id, group2.id);
  } catch (error) {
    console.error("Error creating test data:", error.message);
  }
}

const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});