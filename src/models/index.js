const fs = require("fs");
const path = require("path");
const ucfirst = require("ucfirst");
const camelCase = require("camelcase");
const Sequelize = require("sequelize");

const {
    DB_NAME,
    DB_PWD,
    DB_HOST,
    DB_USER
} = process.env;

const db = {};

const sequelize = new Sequelize({
  username: DB_USER,
  password: DB_PWD,
  database: DB_NAME,
  host: DB_HOST,
  dialect: "mysql",
});

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 &&
      file !== path.basename(__filename) &&
      file.slice(-3) === ".js"
  )
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    const modelName = ucfirst(camelCase(file.split(".")[0]));
    db[`${modelName}Model`] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
