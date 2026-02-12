const express = require("express");

const errorHandler = require("./middleware/errorHandler");

const dotenv = require("dotenv").config();

const contactRoutes = require("./routes/contactRoutes");

//MongoDb Connection
const connectDb = require("./config/mongo");
connectDb();

//MySql Connection
//const { connectMySql } = require("./config/mysql");
//connectMySql();

//Sequelize(ORM) connection
const { connectSequelize } = require("./config/sequelize");
connectSequelize();

const app = express();

const port = process.env.PORT;

app.use(express.json());

app.use("/api/contacts", contactRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
