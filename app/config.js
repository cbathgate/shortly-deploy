var mongodb = require('mongodb');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var url = 'mongodb://localhost:27017/shortlydb';

mongoose.connect(url);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('You done connected to the server.');
});

module.exports = db;

