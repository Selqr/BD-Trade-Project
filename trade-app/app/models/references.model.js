module.exports = (db) => {
  db.goodsGroup.hasMany(db.goods, {
    foreignKey: 'goods_group_id',
    as: 'goods'
  });
  
  db.goods.belongsTo(db.goodsGroup, {
    foreignKey: 'goods_group_id',
    as: 'group'
  });
};