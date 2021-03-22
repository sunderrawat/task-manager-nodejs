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
  //   const id = new mongodb.ObjectID();
  //   console.log(id.getTimestamp());

  //insert one user into database
  //   db.collection('users').insertOne({
  //     name: 'Sunder',
  //     age: 25,
  //   });

  //insert many task into database
  //   db.collection('tasks').insertMany([{
  //       Description: 'Lawani katni',
  //       completed: false
  //   },{
  //       Description: 'Sarso ekathi karni',
  //       completed: false
  //   },{
  //       Description: 'Chai pini',
  //       completed: true
  //   }
  // ],(error, result)=>{
  //       if(error){
  //           return console.log('Unable to insert collection');
  //       }
  //       console.log(result.ops);
  //   }
  //   )

  // find data from database
  //   db.collection('tasks').findOne(
  //     {
  //       _id: mongodb.ObjectID('605718b148decb2a6aa0029b'),
  //     },
  //     (error, user) => {
  //       console.log(user);
  //     }
  //   );

  // db.collection('tasks')
  //   .find({ completed: false })
  //   .toArrayf((error, work) => {
  //     console.log(work);
  //   });

  //update one data from database
  // db.collection('tasks')
  //   .updateOne(
  //     {
  //       _id: mongodb.ObjectID('605718b148decb2a6aa0029d')
  //     },
  //     {
  //       $set: {
  //         completed: false,
  //       },
  //     }
  //   )
  //   .then(result => console.log(result))
  //   .catch(error => console.log(error));

  //update many data from database
  // db.collection('tasks')
  //   .updateMany(
  //     {
  //       completed: false
  //     },
  //     {
  //       $set: {
  //         completed: true
  //       },
  //     }
  //   )
  //   .then(result => console.log(result.modifiedCount))
  //   .catch(error => console.log(error));

  //delete one task from database
  // db.collection('tasks')
  //   .deleteOne({
  //     _id: mongodb.ObjectID('605718b148decb2a6aa0029b'),
  //   })
  //   .then(result => console.log(result.deletedCount))
  //   .catch(error => console.log(error));

  //delete many task from database
  // db.collection('tasks')
  //   .deleteMany({
  //     completed: true
  //   })
  //   .then(result => console.log(result.deletedCount))
  //   .catch(error => console.log(error));
});
