const db = require("../models");
const Goods = db.goods;
const Sequelize = db.Sequelize;

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Название товара не может быть пустым!"
    });
    return;
  }

  const goods = {
    name: req.body.name,
    code: req.body.code,
    description: req.body.description,
    price: req.body.price,
    goods_group_id: req.body.goods_group_id
  };

  Goods.create(goods)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ошибка при создании товара."
      });
    });
};

exports.findAll = (req, res) => {
  Goods.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ошибка при получении товаров."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Goods.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Товар с ID=${id} не найден.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Ошибка при получении товара с ID=${id}`
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Goods.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Товар успешно обновлен."
        });
      } else {
        res.send({
          message: `Невозможно обновить товар с ID=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Ошибка при обновлении товара с ID=${id}`
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Goods.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Товар успешно удален!"
        });
      } else {
        res.send({
          message: `Невозможно удалить товар с ID=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Не удалось удалить товар с ID=${id}`
      });
    });
};

exports.getGoodsGroupName = (req, res) => {
  const id = req.params.id;

  db.sequelize.query(
    `SELECT gg.name FROM goods_groups gg 
     LEFT JOIN goods g ON gg.id = g.goods_group_id 
     WHERE g.id = ${id}`,
    {
      type: Sequelize.QueryTypes.SELECT
    }
  )
    .then(data => {
      if (data.length > 0) {
        res.send(data[0]);
      } else {
        res.status(404).send({
          message: `Товар с ID=${id} не найден или не имеет группы.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Ошибка при получении названия группы для товара с ID=${id}`
      });
    });
};

exports.getGoodsGroup = (req, res) => {
  const id = req.params.id;

  db.sequelize.query(
    'SELECT gg.* FROM goods_groups gg LEFT JOIN goods g ON gg.id = g.goods_group_id WHERE g.id = :id',
    {
      replacements: { id: id },
      type: Sequelize.QueryTypes.SELECT,
      model: db.goodsGroup,
      mapToModel: true
    }
  )
    .then(data => {
      if (data.length > 0) {
        res.send(data[0]);
      } else {
        res.status(404).send({
          message: `Товар с ID=${id} не найден или не имеет группы.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Ошибка при получении группы для товара с ID=${id}`
      });
    });
};