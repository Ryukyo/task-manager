/* const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID; */

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) return console.log("Unable to connect to database");
    
    const db = client.db(databaseName);

    /* db.collection('tasks').findOne({ _id: ObjectID("5efc3be82f876037cc8bce80") }, (error, task) => {
        console.log(task);
    })

    db.collection('tasks').find({ completed: true }).toArray((error, tasks) => {
        console.log(tasks);
    }) */

    /* db.collection('tasks').updateMany({ 
        completed: false 
    }, {
        $set: {
            completed: true,
        }
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error);
    }) */

    db.collection('tasks').deleteOne({
      _id: ObjectID("5efc3be82f876037cc8bce80")  
    }).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    })
});