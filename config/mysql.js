const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const connectMySql = async () => {
  try {
    const connection = await pool.getConnection();

    console.log(
      `MySQL Connected | Host: ${connection.config.host} | Database: ${connection.config.database}`,
    );

    connection.release();
  } catch (err) {
    console.error("MySQL connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = {
  pool,
  connectMySql,
};
