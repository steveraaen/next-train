var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SubwaysSchema = new Schema({
  
  geometry: {
	   	coordinates: {type: [Number]},
	   	type: {type: String}
	   }, 
  properties: {
      stop_name: {type: String},
      stop_id: {type: String},
      stop_feed: {type: Number}
  }
});

var Subways = mongoose.model("Subways", SubwaysSchema);

module.exports = Subways;