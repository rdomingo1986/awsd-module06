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
  IndexName: "Gender-SongName-index-copy",
  KeyConditionExpression:"#G = :val",
  FilterExpression: "#Y >= :val1",
  ExpressionAttributeNames: {
    "#G": "Gender",
    "#Y": "Year"
  },
  ExpressionAttributeValues: {
      ":val": "Trash Metal",
      ":val1": 2011
  }
};

dynamodb.query(requestParams, function (err, response) {
  if (err) return console.log(err);
  console.log(response);
});