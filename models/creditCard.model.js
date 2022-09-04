const { Schema, model } = require('mongoose');

module.exports = (sequelize, Sequelize) => {
  const CreditCard = sequelize.define('creditcard', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    number: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    cvv: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    cardHolder: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    expireMonth: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    expireYear: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  return CreditCard;
};
