const dotenv = require('dotenv');

// This loads all the environment variables inside process.env
dotenv.config();

module.exports = {
  PORT: process.env.PORT
};
