
var bunyan=require('bunyan');
var looog = require('./repo/logtest');
var app=require("./config/config.js").dep();
var port=require("./config/config.js").port1();
var request = require('request');
var LogEntryStream = require('bunyan-mongodb-stream')({model: looog});
var log = bunyan.createLogger({
    name: 'foo',
    streams: [{
        path: 'foo.log',

        // `type: 'file'` is implied
    },
        {
            stream: LogEntryStream,

        }


    ],
    serializers: bunyan.stdSerializers

});
// get list of contacts from a company
var cors=require('cors');
app.use(cors())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function(req, res) {
    var options = { headers: {
        'Authorization': 'Basic QWRtaW5pc3RyYXRvcjo='
    },
        url: "http://13.126.47.35:8080/AccountRight/?format=json"
    }
    request.get(options, function(error, response, body) {
        res.set('Content-Type', 'Application/json');
        if (!error && response.statusCode == 200) {
log.info(response.statusCode);
            console.log("success response from Myob: "+body);
            res.status(response.statusCode).send(body);
        } else {
            console.log("failure response from Myob: "+body);
            res.status(response.statusCode).send(body);
            log.error('failed to load website ');
        }
    });
})
app.get('/contacts', function(req, res) {
    var options = { headers: {
        'Authorization': 'Basic QWRtaW5pc3RyYXRvcjo='
    },
        url: "http://13.126.47.35:8080/AccountRight/48b58bb2-e017-4368-87c4-1fe44c1334ca/Contact/Customer/?format=json"
    }
    request.get(options, function(error, response, body) {
        res.set('Content-Type', 'Application/json');
        if (!error && response.statusCode == 200) {
            console.log("success response from Myob: "+body);
            res.status(response.statusCode).send(body);
            log.info('shown all contact details ')
        } else {
            console.log("failure response from Myob: "+body);
            res.status(response.statusCode).send(body);
            log.error('failed to shown all contacts ');
        }
    });
})

app.get('/contacts/:id', function(req, res) {
    var id = req.params.id;
    console.log("Request param id: "+id);
    var options = { headers: {
        'Authorization': 'Basic QWRtaW5pc3RyYXRvcjo='
    },
        url: "http://13.126.47.35:8080/AccountRight/48b58bb2-e017-4368-87c4-1fe44c1334ca/Customer/"+id+"/?format=json"
    }
    request.get(options, function(error, response, body) {
        res.set('Content-Type', 'Application/json');
        if (!error && response.statusCode == 200) {
            console.log("success response from Myob: "+body);
            res.status(response.statusCode).send(body);
            log.info(response.statusCode);

        } else {
            console.log("failure response from Myob: "+body);
            res.status(response.statusCode).send(body);
            log.warn('when data of perticular company not found ');
        }
    });
})
app.post('/contacts/new', function(req, res) {
    var requestBody = JSON.stringify(req.body);
    console.log("Request body: "+requestBody);
    var options = { headers: {
        'Authorization': 'Basic QWRtaW5pc3RyYXRvcjo='
    },
        url: "http://13.126.47.35:8080/AccountRight/48b58bb2-e017-4368-87c4-1fe44c1334ca/Contact/Customer/?format=json",
        body: requestBody
    }
    request.post(options, function(error, response, body) {
        res.set('Content-Type', 'Application/json');
        if (!error && response.statusCode == 201) {
            console.log("success response from Myob: "+body);
            res.status(response.statusCode).send(body);
            log.info('data updatedsuccesfully');

        } else {
            console.log("failure response from Myob: "+body);
            res.status(response.statusCode).send(body);
            log.debug('when filed to create new data');
        }
    });
})
app.delete('/contacts/:id', function(req, res) {
    var id = req.params.id;
    console.log("Request param id: "+id);
    var options = { headers: {
        'Authorization': 'Basic QWRtaW5pc3RyYXRvcjo='
    },
        url: "http://13.126.47.35:8080/AccountRight/48b58bb2-e017-4368-87c4-1fe44c1334ca/Customer/"+id+"/?format=json"
    }
    request.delete(options, function(error, response, body) {
        res.set('Content-Type', 'Application/json');
        if (!error && response.statusCode == 200) {
            console.log("success response from Myob: "+body);
            res.status(response.statusCode).send(body);
            log.info(response.statusCode,'data deleted');

        } else {
            console.log("failure response from Myob: "+body);
            res.status(response.statusCode).send(body);
            log.warn('important data can be deleted');
        }
    });
})



app.listen(3000)
module.exports=app;