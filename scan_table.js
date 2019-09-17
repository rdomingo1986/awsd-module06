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
  ProjectionExpression: "SongName, AlbumName, #Y",
  FilterExpression: "#Y between :start_yr and :end_yr",
  ExpressionAttributeNames: {
    "#Y": "Year"
  },
  ExpressionAttributeValues: {
    ":start_yr": 1995,
    ":end_yr": 2019
  }
};

dynamodb.scan(requestParams, function (err, response) {
  if (err) return console.log(err);
  console.log(response);
});
