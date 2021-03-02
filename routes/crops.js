const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const { mongoDbDB, mongoUrl } = require('../credentials');

router.get('/getCropTypes', (req, res) => {
    const client = new MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
        if (err) throw err
        const collection = client.db(mongoDbDB).collection("cultivos");
        collection.find().toArray((err, results) => {
            if (err) throw err
            res.status(200).send(results);
            client.close();
        });
    });
});

module.exports = router;
