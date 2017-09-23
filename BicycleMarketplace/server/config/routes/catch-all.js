const router = require('express').Router();
const path = require('path');

module.exports = router
    .all('*', function(req, res) {
        // console.log(__dirname);
        res.sendFile(path.join(__dirname, '../../../market/dist/index.html'));
        // res.sendfile(path.join(__dirname, '../../../../dist/index.html'));
    })