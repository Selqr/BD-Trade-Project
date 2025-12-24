const db = require("../models");

// Создать товар
exports.create = async (req, res) => {
  try {
    const goods = await db.goods.create(req.body);
    res.json(goods);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Получить все товары
exports.findAll = async (req, res) => {
  try {
    const goods = await db.goods.findAll({
      include: [{
        model: db.goodsGroup,
        as: 'group'
      }]
    });
    res.json(goods);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Получить товар по ID
exports.findOne = async (req, res) => {
  try {
    const goods = await db.goods.findByPk(req.params.id, {
      include: [{
        model: db.goodsGroup,
        as: 'group'
      }]
    });
    
    if (!goods) {
      return res.status(404).json({ error: "Goods not found" });
    }
    
    res.json(goods);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Обновить товар
exports.update = async (req, res) => {
  try {
    const [updated] = await db.goods.update(req.body, {
      where: { id: req.params.id }
    });
    
    if (updated) {
      const updatedGoods = await db.goods.findByPk(req.params.id);
      res.json(updatedGoods);
    } else {
      res.status(404).json({ error: "Goods not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Удалить товар
exports.delete = async (req, res) => {
  try {
    const deleted = await db.goods.destroy({
      where: { id: req.params.id }
    });
    
    if (deleted) {
      res.json({ message: "Goods deleted successfully" });
    } else {
      res.status(404).json({ error: "Goods not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Получить название группы товара
exports.getGoodsGroupName = async (req, res) => {
  try {
    const goods = await db.goods.findByPk(req.params.id, {
      include: [{
        model: db.goodsGroup,
        as: 'group',
        attributes: ['name']
      }]
    });
    
    if (!goods) {
      return res.status(404).json({ error: "Goods not found" });
    }
    
    res.json({ 
      goodsId: goods.id,
      goodsName: goods.name,
      groupName: goods.group ? goods.group.name : null
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Получить полную информацию о группе товара
exports.getGoodsGroup = async (req, res) => {
  try {
    const goods = await db.goods.findByPk(req.params.id, {
      include: [{
        model: db.goodsGroup,
        as: 'group'
      }]
    });
    
    if (!goods) {
      return res.status(404).json({ error: "Goods not found" });
    }
    
    res.json(goods.group);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};