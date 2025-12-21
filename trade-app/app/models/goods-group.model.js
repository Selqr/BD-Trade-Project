module.exports = (sequelize, Sequelize) => {
  const GoodsGroup = sequelize.define("goods_group", {
    name: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    code: {
      type: Sequelize.STRING(20),
      allowNull: false,
      unique: true
    },
    description: Sequelize.TEXT,
    category_type: {
      type: Sequelize.ENUM('двигатель', 'трансмиссия', 'ходовая', 'электрика', 'кузов', 'салон', 'расходники')
    }
  }, {
    timestamps: true
  });
  
  return GoodsGroup;
};