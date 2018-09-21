const express = require('express');
const models = require('./models');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const schema = require('./schema/schema');


const app = express();

const MONGO_URI = 'mongodb://michael_dragomir:Foxymonkey1@ds161322.mlab.com:61322/hiltonhoteldb';
if (!MONGO_URI) {
  throw new Error('You must provide a MongoLab URI');
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI);
mongoose.connection
  .once('open', () => console.log('Connected to MongoLab instance.'))
  .on('error', error => console.log('Error connecting to MongoLab:', error));


app.use(bodyParser.json());
app.use('/graphql',(req,res,next)=>{
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'content-type, authorization, content-length, x-requested-with, accept, origin');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.header('Allow', 'POST, GET, OPTIONS');
  res.header('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
}, graphqlHTTP({
  schema,
  graphiql: true
}));


module.exports = app;
