var mon=require('mongoose');
//var Schema=mon.Schema;
var scheme=new mon.Schema({
    msg: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        required: true
    },
    res : {
        type: Object
    },
    req : {
        type: Object
    }


});
module.exports=mon.model('logs',scheme)