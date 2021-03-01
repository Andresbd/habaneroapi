const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;

const { mongoDbPw, mongoDbDB } = require('../credentials');

// Connection URL
const url = `mongodb+srv://habaneroadmin:${mongoDbPw}@realmcluster.2jxcr.mongodb.net/${mongoDbDB}?retryWrites=true&w=majority`;

router.get('/getWorkers', (req, res) => {
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
        if (err) throw err
        const collection = client.db(mongoDbDB).collection("roles");
        collection.find().toArray((err, results) => {
            if (err) throw err
            res.status(200).send(results);
            client.close();
        });
    });
})

module.exports = router;
