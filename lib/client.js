const AWS = require("aws-sdk");

const S3 = new AWS.S3({
  region: "gb-ldn",
  endpoint: "https://f8b8.ldn.idrivee2-33.com",
  credentials: {
    accessKeyId: process.env.access_key,
    secretAccessKey: process.env.secret_key,
  },
});

module.exports = { S3 };
