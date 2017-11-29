const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const mainSubStop = require('./models/MainStops.js');
var Mta = require('mta-gtfs');


const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

mongoose.connect('mongodb://heroku_tm8f0g3q:q0amp91hikf6ki2vn1grsnov5o@ds163745.mlab.com:63745/heroku_tm8f0g3q', {
  useMongoClient: true,
}).then(function() {
  console.log('Mongo connected via mongoose')
});
// --------- route to find nearest stations-------------------



app.get("/api/stops/:coordinates?", function(req, res) {
	console.log(parseFloat(req.query.coordinates))
    var lat = parseFloat(req.query.coordinates[1]).toFixed(6)
    var lng = parseFloat(req.query.coordinates[0]).toFixed(6)
	console.log(lng)
	console.log(lat)
   /* getMtaSched()*/
mainSubStop.find({
    geometry: {
        $near: {
            $geometry: {
                type: "Point",
                coordinates: [lng, lat]
            },
            $maxDistance: 5000,
        }
    }
}, function(error, doc) {
    if (error) {
        console.log(error);
    } else {
        console.log(doc)
        res.json(doc);
    }
}).limit(3)

});


// ------- route for selected train's schedule --------
app.get("/api/train/:station?", function(req, res) {
    var feed = parseInt(req.query.feed);
    var station = req.query.station;
    console.log(feed)
    console.log(station)

var mta = new Mta({
  key: 'd95f1fb11f498729369198ba2d321657', // only needed for mta.schedule() method                 
});
if(req.query.station) {
mta.schedule(station, feed).then(function (result) {
  console.log(result);
});
}
});
// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/public/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Next Train listening on ${port}`);



