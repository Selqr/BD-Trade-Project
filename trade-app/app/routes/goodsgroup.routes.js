module.exports = app => {
  const goodsGroup = require("../controllers/goodsgroup.controller.js");
  const router = require("express").Router();

  // Создание новой группы товаров
  router.post("/", goodsGroup.create);

  // Получение всех групп товаров
  router.get("/", goodsGroup.findAll);

  // Получение одной группы товаров по ID
  router.get("/:id", goodsGroup.findOne);

  // Обновление группы товаров по ID
  router.put("/:id", goodsGroup.update);

  // Удаление группы товаров по ID
  router.delete("/:id", goodsGroup.delete);

  // Удаление всех групп товаров
  router.delete("/", goodsGroup.deleteAll);
  
  // Префикс для всех маршрутов
  app.use("/api/goodsgroups", router);
};