module.exports = (sequelize, Sequelize) => {
  const Goods = sequelize.define("goods", {
    part_number: {
      type: Sequelize.STRING(50),
      allowNull: false,
      unique: true
    },
    name: {
      type: Sequelize.STRING(200),
      allowNull: false
    },
    brand: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    car_brand: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    car_model: Sequelize.STRING(100),
    category: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    description: Sequelize.TEXT,
    weight: Sequelize.DECIMAL(8, 3),
    warranty_months: {
      type: Sequelize.INTEGER,
      defaultValue: 12
    },
    is_original: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  }, {
    timestamps: true
  });
  
  return Goods;
};