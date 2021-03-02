const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const { mongoDbDB, mongoUrl } = require('../credentials');

router.get('/getWorkerTypes', (req, res) => {
    const client = new MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
        if (err) throw err
        const collection = client.db(mongoDbDB).collection("roles");
        collection.find().toArray((err, results) => {
            if (err) throw err
            res.status(200).send(results);
            client.close();
        });
    });
});

router.put('/createWorker', (req, res) => {
    const client = new MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        client.connect((err) => {
            const collection = client.db(mongoDbDB).collection("trabajadores");
            const writeWorker = collection.insertOne(req.body)
            writeWorker
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
});

router.get('/getCutWorkers', (req, res) => {
    const client = new MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
        if (err) throw err
        const collection = client.db(mongoDbDB).collection("trabajadores");
        collection.find({"rol": 'Cortador'}).toArray((err, results) => {
            if (err) throw err
            res.status(200).send(results);
            client.close();
        });
    });
});

router.get('/getSupervisorWorkers', (req, res) => {
    const client = new MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
        if (err) throw err
        const collection = client.db(mongoDbDB).collection("trabajadores");
        collection.find({"rol": 'Administrador'}).toArray((err, results) => {
            if (err) throw err
            res.status(200).send(results);
            client.close();
        });
    });
});

module.exports = router;
