const { Sequelize } = require("sequelize");

/* ================= MYSQL ================= */
const mysqlSequelize = new Sequelize(
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

/* ================= MSSQL ================= */

const mssqlSequelize = new Sequelize(
  process.env.MSSQL_DATABASE,
  process.env.MSSQL_USER,
  process.env.MSSQL_PASSWORD,
  {
    host: process.env.MSSQL_HOST,
    port: process.env.MSSQL_PORT || 1433,
    dialect: "mssql",

    dialectOptions: {
      options: {
        encrypt: false,
        trustServerCertificate: true,
      },
    },

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
    if (process.env.DB_TYPE === "mssql") {
      await mssqlSequelize.authenticate();
      console.log(
        `MSSQL(Sequelize) Connected | Host: ${process.env.MSSQL_HOST} | Database: ${process.env.MSSQL_DATABASE}`,
      );
    } else {
      await mysqlSequelize.authenticate();
      console.log(
        `MySQL(Sequelize) Connected | Host: ${process.env.MYSQL_HOST} | Database: ${process.env.MYSQL_DATABASE}`,
      );
    }
  } catch (error) {
    console.error("Sequelize connection failed:", error.message);
    process.exit(1);
  }
};

const sequelize =
  process.env.DB_TYPE === "mssql" ? mssqlSequelize : mysqlSequelize;

module.exports = {
  sequelize,
  connectSequelize,
};
