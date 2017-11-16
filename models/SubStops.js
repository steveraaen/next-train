var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var stopSchema = new Schema({
 
     type: String,
     properties: {
     stop_id: String,
     stop_code: String,
     stop_name: String,
     stop_desc: String,
     zone_id: String,
     stop_url: String,
     location_type: String,
     parent_station: String 
},
     geometry: { 
          coordinates: {type: [Number], index: '2dsphere'}
     }
});

var Substop = mongoose.model("Substop", stopSchema);

module.exports = Substop;