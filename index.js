const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    uuid = require('uuid');

app.use(bodyParser.json());

let users = [

]

let movies = [

]





app.listen(8080, () => {
    console.log('Your app ist listening on port 8080');

});