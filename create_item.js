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
  TableName: 'Songs',
  Item: {
    'AlbumName': 'Bon Jovi',
    'SongName': 'Runaway',
    'BandName': 'Bon Jovi',
    'Gender': 'Glam Metal',
    'Songs': 9,
    'Year': 1984
  }
};

dynamodb.put(requestParams, function (err, response) {
  if (err) return console.log(err);
  console.log(response);
});