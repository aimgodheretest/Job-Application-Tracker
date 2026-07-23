const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");

require("dotenv").config();

const sslConfig = process.env.AIVEN_CA_CERT
  ? {
      ca: process.env.AIVEN_CA_CERT,
    }
  : {
      ca: fs.readFileSync(path.join(__dirname, "ca.pem")),
    };

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",

    dialectOptions: {
      ssl: sslConfig,
    },

    logging: false,
  },
);

module.exports = sequelize;
