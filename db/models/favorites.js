'use strict';
module.exports = function(sequelize, DataTypes) {
  var Favorites = sequelize.define('Favorites', {
    user_id: DataTypes.BIGINT,
    address: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Favorites;
};