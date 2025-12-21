module.exports = (sequelize, Sequelize) => {
  const PurchaseGoods = sequelize.define("purchase_goods", {
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    unit_price: {
      type: Sequelize.DECIMAL(12, 2),
      allowNull: false
    },
    total_price: {
      type: Sequelize.DECIMAL(12, 2),
      allowNull: false
    },
    warranty_applied: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }
  }, {
    timestamps: true
  });
  
  return PurchaseGoods;
};