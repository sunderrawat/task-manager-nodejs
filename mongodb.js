const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;
const mongoURL = 'mongodb://127.0.0.1:27017';
const dbName = 'task-manager';

MongoClient.connect(mongoURL, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.log('Mongodb not connect');
  }
//   console.log('mongodb connected');

  const db = client.db(dbName);
  db.collection('users').insertOne({
      name: 'Sunder',
      age: 25
  })
});
