const bikes = require('../../controllers/bikes.js');
const router = require('express').Router();

module.exports = router

    .get('/', bikes.show)
    .get('/my/:id', bikes.getMine)
    .get('/:id', bikes.get)
    .post('/addBike/:id', bikes.create)
    .put('/:id', bikes.update)
    .delete('/:id', bikes.remove)
    .post('/upload', bikes.upload);