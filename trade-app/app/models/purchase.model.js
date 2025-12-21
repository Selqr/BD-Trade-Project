module.exports = (sequelize, Sequelize) => {
  const Purchase = sequelize.define("purchase", {
    purchase_number: {
      type: Sequelize.STRING(20),
      allowNull: false,
      unique: true
    },
    purchase_date: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    },
    client_name: Sequelize.STRING(100),
    client_phone: Sequelize.STRING(20),
    car_brand: Sequelize.STRING(50),
    car_model: Sequelize.STRING(50),
    car_year: Sequelize.INTEGER,
    vin: Sequelize.STRING(17),
    total_amount: {
      type: Sequelize.DECIMAL(12, 2),
      defaultValue: 0
    },
    status: {
      type: Sequelize.ENUM('оформлен', 'оплачен', 'выдан', 'отменен'),
      defaultValue: 'оформлен'
    },
    payment_method: {
      type: Sequelize.ENUM('нал', 'безнал', 'карта'),
      defaultValue: 'нал'
    },
    notes: Sequelize.TEXT
  }, {
    timestamps: true
  });
  
  return Purchase;
};