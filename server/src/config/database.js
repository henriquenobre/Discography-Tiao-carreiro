require("dotenv").config();

console.log(process.env.DB_STORAGE);

module.exports = {
  storage: process.env.DB_STORAGE,
  dialect: process.env.DB_DIALECT,
}
