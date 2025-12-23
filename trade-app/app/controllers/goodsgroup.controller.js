const db = require("../models");
const GoodsGroup = db.goodsGroup;
const Op = db.Sequelize.Op;

// Создание новой группы товаров
exports.create = (req, res) => {
  // Валидация запроса
  if (!req.body.name) {
    return res.status(400).send({
      message: "Название группы не может быть пустым!"
    });
  }

  if (!req.body.code) {
    return res.status(400).send({
      message: "Код группы не может быть пустым!"
    });
  }

  // Создание объекта группы товаров
  const goodsGroup = {
    name: req.body.name,
    code: req.body.code,
    description: req.body.description,
    category_type: req.body.category_type
  };

  // Сохранение в базе данных
  GoodsGroup.create(goodsGroup)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Произошла ошибка при создании группы товаров."
      });
    });
};

// Получение всех групп товаров
exports.findAll = (req, res) => {
  const name = req.query.name;
  let condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

  GoodsGroup.findAll({ 
    where: condition,
    order: [['name', 'ASC']]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Произошла ошибка при получении групп товаров."
      });
    });
};

// Получение одной группы товаров по ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  GoodsGroup.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Группа товаров с ID=${id} не найдена.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Ошибка при получении группы товаров с ID=${id}`
      });
    });
};

// Обновление группы товаров по ID
exports.update = (req, res) => {
  const id = req.params.id;

  GoodsGroup.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Группа товаров успешно обновлена."
        });
      } else {
        res.status(404).send({
          message: `Невозможно обновить группу товаров с ID=${id}. Возможно, группа не найдена или req.body пуст.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Ошибка при обновлении группы товаров с ID=${id}`
      });
    });
};

// Удаление группы товаров по ID
exports.delete = (req, res) => {
  const id = req.params.id;

  GoodsGroup.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Группа товаров успешно удалена!"
        });
      } else {
        res.status(404).send({
          message: `Невозможно удалить группу товаров с ID=${id}. Возможно, группа не найдена.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Не удалось удалить группу товаров с ID=${id}`
      });
    });
};

// Удаление всех групп товаров
exports.deleteAll = (req, res) => {
  GoodsGroup.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} групп товаров успешно удалены!` });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Произошла ошибка при удалении всех групп товаров."
      });
    });
};