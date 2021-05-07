const Sequelize = require("sequelize");
const db = require("../database/db.js");

module.exports = db.sequelize.define(
  "user",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    first_name: {
      type: Sequelize.STRING,
      allowNull:false
    },
    last_name: {
      type: Sequelize.STRING,
      allowNull:false
    },
    address:{
      type: Sequelize.STRING,
      allowNull:false
    },
    gender:{
      type:Sequelize.STRING,
      allowNull:false
    },
    created: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: false
  }
);
