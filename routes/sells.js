const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const { mongoDbDB, mongoUrl } = require('../credentials');

router.put('/createSell', (req, res) => {
    const client = new MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        client.connect((err) => {
            const collection = client.db(mongoDbDB).collection("venta");
            const writeCut = collection.insertOne(req.body)
            writeCut
                .then((response) => {
                    res.status(200).send('Successfully inserted into db');
                    client.close();
                })
                .catch((err) => {
                    console.log('Error', err)
                    res.status(400).send('Error writing on db');
                    client.close();
                })
        })
    } catch (e) {
        res.status(401).send('Error accessing db');
        client.close();
    }
})

module.exports = router;
