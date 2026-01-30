const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/sequelize");

const Contact = sequelize.define(
  "Contact",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },

  {
    tableName: "contacts",
    timestamps: true, //creates createAt and updateAt
    underscored: true,
  },
);

module.exports = Contact;
