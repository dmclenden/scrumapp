'use strict';
module.exports = (sequelize, DataTypes) => {
  const articles = sequelize.define('articles', {
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    datecreated: DataTypes.DATE,
    dateupdated: DataTypes.DATE
  }, {});
  articles.associate = function(models) {
    // associations can be defined here
  };
  return articles;
};