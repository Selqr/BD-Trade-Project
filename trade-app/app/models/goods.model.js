module.exports = (sequelize, Sequelize) => {
  const Goods = sequelize.define("goods", {
    name: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    code: {
      type: Sequelize.STRING(20),
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    price: {
      type: Sequelize.DECIMAL(10, 2),
      defaultValue: 0
    },
    goods_group_id: {
      type: Sequelize.INTEGER,
      allowNull: true
    }
  }, {
    underscored: true
  });
  
  return Goods;
};