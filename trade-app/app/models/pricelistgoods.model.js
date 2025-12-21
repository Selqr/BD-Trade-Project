module.exports = (sequelize, Sequelize) => {
  const PriceListGoods = sequelize.define("price_list_goods", {
    price: {
      type: Sequelize.DECIMAL(12, 2),
      allowNull: false
    },
    discount: {
      type: Sequelize.DECIMAL(5, 2),
      defaultValue: 0
    },
    stock_quantity: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    delivery_days: {
      type: Sequelize.INTEGER,
      defaultValue: 1
    },
    is_available: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }
  }, {
    timestamps: true
  });
  
  return PriceListGoods;
};