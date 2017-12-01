var request = require('request');
var Mta = require('mta-gtfs');
var moment = require('moment');
var Subways = require('./models/SubwayStops');

function getMtaSched() {



var redGreen = ["1", "2", "3", "4", "5", "6", "7", "S"]; // 1
var blue = ["A", "C", "E"]; // 26
var yellow = ["N", "Q", "R", "W"]; // 16
var orange = ["B", "D", "F", "M", ] // 21

var mta = new Mta({
  key: 'd95f1fb11f498729369198ba2d321657', // only needed for mta.schedule() method                 
});

mta.stop().then(function (result) {

 
  for(stp in result) {
if( ! result[stp].parent_station) {
/*console.log(result[stp])*/

	var feed;

    if(redGreen.includes(result[stp].stop_id[0])) {
    	feed = 1
    } else if (blue.includes(result[stp].stop_id[0])) {
    	feed = 26
    } else if (yellow.includes(result[stp].stop_id[0])) {
    	feed = 16
    } else if (orange.includes(result[stp].stop_id[0])) {
    	feed = 21
    }

	var subway = new Subways({ 
	 		 
		  geometry: {
			   	coordinates: [result[stp].stop_lon, result[stp].stop_lat],
			   	type: "Point"
			   }, 
		  properties: {
		      stop_name: result[stp].stop_name,
		      stop_id: result[stp].stop_id,
		      stop_feed: feed
		  }
	 })

  }
 	subway.save()
 	console.log(subway)
}

}).catch(function (err) {
  console.log(err);
});

}
getMtaSched()
module.exports = getMtaSched











