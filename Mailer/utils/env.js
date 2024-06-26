const dotenv = require('dotenv');
const path = require("path");

dotenv.config();

dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

module.exports = process.env;