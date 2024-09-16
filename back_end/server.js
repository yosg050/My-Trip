import express from 'express';
// const express = require('express');
import cors from 'cors';
import getByGeo from './node_app.js';
import searchBox from './searchBox.js';
import placeId from './placeId.js';
// const { filterLocations } = require('./locationFilters');

const app = express();
const router = express.Router();
const PORT = 4000 || 5000;
console.log(PORT);
app.use(express.json());
app.use(cors())
import { apiKeyG} from './apiKey.js';
import filterLocations from './filterLocations.js';

const apiKey = apiKeyG;
// const emailKye = gmailKye;
app.get('/places', async (req, res) => {
    const { longitude, latitude } = req.query
    await getByGeo(longitude, latitude, apiKey).then((map) => {
        res.status(200).json(map)
    }).catch((e) => {
        res.status(400).send(e)
    })
})


app.post('/filter-locations', async (req, res) => {
    try {
        const { locations, searchParams } = req.body;
        const filteredLocations = await filterLocations({ locations, searchParams, apiKey });
        res.status(200).json(filteredLocations);
    } catch (error) {
        console.error('Error in filtering locations:', error);
        res.status(400).json({ error: 'Error processing request' });
    }
});


app.get('/autocomplete', async (req, res) => {
    const value = req.query
    // console.log(value);
    await searchBox(value, apiKey).then((map) => {
        res.status(200).json(map)
        // console.log(map);
    }).catch((e) => {
        res.status(400).send(e)
    })
})


app.get('/placeDetails', async (req, res) => {
    const  value  = req.query
    console.log(req.query);
    await placeId(value, apiKey).then((map) => {
        res.status(200).json(map)
    }).catch((e) => {
        res.status(400).send(e)
    })
})


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});





// router.route