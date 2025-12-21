module.exports = (sequelize, Sequelize) => {
  const PriceList = sequelize.define("price_list", {
    name: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    code: {
      type: Sequelize.STRING(20),
      allowNull: false,
      unique: true
    },
    start_date: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    },
    end_date: Sequelize.DATE,
    price_type: {
      type: Sequelize.ENUM('розница', 'опт', 'дилерская'),
      defaultValue: 'розница'
    },
    currency: {
      type: Sequelize.STRING(3),
      defaultValue: 'RUB'
    },
    is_active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }
  }, {
    timestamps: true
  });
  
  return PriceList;
};