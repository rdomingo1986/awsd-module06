require('dotenv').config();

var AWS = require('aws-sdk');

var config = {
  accessKeyId: process.env.API_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  region: process.env.REGION,
  endpoint: process.env.ENDPOINT
};

var dynamodb = new AWS.DynamoDB(config);

var requestParams = {
  TableName : "Songs",
  KeySchema: [       
      { AttributeName: "AlbumName", KeyType: "HASH"},
      { AttributeName: "SongName", KeyType: "RANGE" }
  ],
  AttributeDefinitions: [       
      { AttributeName: "AlbumName", AttributeType: "S" },
      { AttributeName: "SongName", AttributeType: "S" }
  ],
  ProvisionedThroughput: {       
      ReadCapacityUnits: 5, 
      WriteCapacityUnits: 5
  }
};

dynamodb.createTable(requestParams, function (err, response) {
  if (err) return console.log(err);
  console.log(response);
});