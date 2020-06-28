const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) return console.log("Unable to connect to database");
    
    const db = client.db(databaseName);

    /* db.collection('users').insertOne({
        name: "Florian",
        age: "28",
    }, (error, result) => {
        if (error) return console.log("Unable to insert user");
        console.log(result.ops)
    }) */

    db.collection('users').insertMany([
        {
            name: "Joe",
            age: 32,
        },
        {
            name: "Franklin",
            age: 46,
        }
    ], (error, result) => {
        if (error) return console.log("Unable to insert users");
        console.log(result.ops);
    });

    db.collection('tasks').insertMany([
        {
            description: "Buy bread",
            completed: true,
        },
        {
            description: "Invite friends",
            completed: true,
        },
        {
            description: "Prepare ice cubes for drinks",
            completed: false,
        }
    ], (error, result) => {
        if (error) return console.log("Unable to add tasks");
        console.log(result.ops);
    })
});