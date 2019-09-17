require('dotenv').config();

var AWS = require('aws-sdk');

var config = {
  accessKeyId: process.env.API_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  region: process.env.REGION,
  endpoint: process.env.ENDPOINT
};

var dynamodb = new AWS.DynamoDB.DocumentClient(config);

var requestParams = {
  TableName: "Songs",
  Key: {
    "AlbumName": "...And Justice for All",
    "SongName": "Blackened"
  }
};

dynamodb.get(requestParams, function (err, response) {
  if (err) return console.log(err);
  console.log(response);
});
