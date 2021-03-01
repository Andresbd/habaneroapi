const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

router.get('/getWorkers', (req, res) => {
    MongoClient.connect(url, (err, client) => {
        if (err) throw err
        const db = client.db('habanero');
        db.collection('roles').find().toArray((err, results) => {
            if (err) throw err
            res.status(200).send(results)
        })
        client.close();
    });
})

module.exports = router;
