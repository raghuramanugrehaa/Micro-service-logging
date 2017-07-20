/**
 * Created by Nani on 7/6/2017.
 */

var express = require('express')
var port=3000;
var bodyParser = require('body-parser');

var app = express()
console.log("8080");
app.use(express.static('public'))

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());


exports.port1=function () {
    return port;
}

exports.dep=function () {
    return app;
}
