const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    dialect: "mysql",

    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },

    logging: false,
  },
);

const connectSequelize = async () => {
  try {
    await sequelize.authenticate();
    console.log(
      `Sequelize Connected | Host: ${process.env.MYSQL_HOST} | Database: ${process.env.MYSQL_DATABASE}`,
    );

    // await sequelize.sync();
    // console.log("Sequelize models synced");
  } catch (error) {
    console.error("Sequelize connection failed: ", error.message);
    process.exit(1);
  }
};

module.exports = {
  sequelize,
  connectSequelize,
};
