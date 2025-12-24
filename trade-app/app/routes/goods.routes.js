module.exports = app => {
  const goods = require("../controllers/goods.controller.js");
  const router = require("express").Router();

  /**
   * @swagger
   * /api/goods:
   *   post:
   *     summary: Создать новый товар
   *     tags: [Товары]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - name
   *               - part_number
   *             properties:
   *               part_number:
   *                 type: string
   *               name:
   *                 type: string
   *               brand:
   *                 type: string
   *               car_brand:
   *                 type: string
   *               car_model:
   *                 type: string
   *               category:
   *                 type: string
   *               goods_group_id:
   *                 type: integer
   *     responses:
   *       200:
   *         description: Товар создан
   */
  router.post("/", goods.create);

  /**
   * @swagger
   * /api/goods:
   *   get:
   *     summary: Получить все товары
   *     tags: [Товары]
   *     responses:
   *       200:
   *         description: Список товаров
   */
  router.get("/", goods.findAll);

  /**
   * @swagger
   * /api/goods/{id}:
   *   get:
   *     summary: Получить товар по ID
   *     tags: [Товары]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Товар найден
   *       404:
   *         description: Товар не найден
   */
  router.get("/:id", goods.findOne);

  /**
   * @swagger
   * /api/goods/{id}:
   *   put:
   *     summary: Обновить товар
   *     tags: [Товары]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *     responses:
   *       200:
   *         description: Товар обновлен
   *       404:
   *         description: Товар не найден
   */
  router.put("/:id", goods.update);

  /**
   * @swagger
   * /api/goods/{id}:
   *   delete:
   *     summary: Удалить товар
   *     tags: [Товары]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Товар удален
   *       404:
   *         description: Товар не найден
   */
  router.delete("/:id", goods.delete);

  /**
   * @swagger
   * /api/goods/{id}/goodsgroupname:
   *   get:
   *     summary: Получить название группы товара
   *     tags: [Товары]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Название группы товара
   */
  router.get("/:id/goodsgroupname", goods.getGoodsGroupName);

  /**
   * @swagger
   * /api/goods/{id}/goodsgroup:
   *   get:
   *     summary: Получить информацию о группе товара
   *     tags: [Товары]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Информация о группе товара
   */
  router.get("/:id/goodsgroup", goods.getGoodsGroup);

  app.use("/api/goods", router);
};