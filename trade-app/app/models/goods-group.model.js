module.exports = (sequelize, Sequelize) => {
    const GoodsGroup = sequelize.define("goodsgroup", {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING
        },
        baseGoodsGroup: {
            type: Sequelize.INTEGER
        }
    });
    
    GoodsGroup.belongsTo(GoodsGroup, { 
        as: 'parentGroup',
        foreignKey: 'baseGoodsGroup' 
    });

    return GoodsGroup;
};