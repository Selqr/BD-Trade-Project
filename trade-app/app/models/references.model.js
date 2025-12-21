module.exports = (db) => {
  db.goodsGroup.hasMany(db.goods, {
    foreignKey: 'goods_group_id',
    as: 'goods'
  });
  
  db.goods.belongsTo(db.goodsGroup, {
    foreignKey: 'goods_group_id',
    as: 'group'
  });
  
  db.priceList.belongsToMany(db.goods, {
    through: db.priceListGoods,
    foreignKey: 'price_list_id',
    otherKey: 'goods_id',
    as: 'goods'
  });
  
  db.goods.belongsToMany(db.priceList, {
    through: db.priceListGoods,
    foreignKey: 'goods_id',
    otherKey: 'price_list_id',
    as: 'price_lists'
  });
};