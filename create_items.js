require('dotenv').config();

var AWS = require('aws-sdk');
var fs = require('fs');

var config = {
  accessKeyId: process.env.API_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  region: process.env.REGION,
  endpoint: process.env.ENDPOINT
};

var dynamodb = new AWS.DynamoDB.DocumentClient(config);
console.log('Please wait...');

var albumsFile = JSON.parse(fs.readFileSync('albums.json', 'utf8'));

albumsFile.forEach(function (album) {
  album.SongNames.forEach(function (song) {
    var requestParams = {
      TableName: 'Songs',
      Item: {
        'AlbumName': album.AlbumName,
        'SongName': song,
        'BandName': album.BandName,
        'Gender': album.Gender,
        'Songs': album.Songs,
        'Year': album.Year
      }
    };
    
    dynamodb.put(requestParams, function (err, response) {
      if (err) console.log(err);
      console.log(response);
    });
  });
});